import { AuthProvider } from "react-admin";

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_JSON_SERVER_URL ||
  "http://localhost:4000";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          "Credenciales incorrectas. Verifique su usuario y contraseña.",
        );
      }

      const { user, token } = await response.json();

      // Store authentication information in localStorage (matching dataProvider)
      localStorage.setItem("auth_token", token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userTurnoId", user.turnoId?.toString() || "");
      localStorage.setItem("userFullName", user.fullName || "");

      return Promise.resolve();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "Error de conexión. Verifique su conexión a internet e inténtelo nuevamente.",
      );
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userTurnoId");
    localStorage.removeItem("userFullName");
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("auth_token");
    const username = localStorage.getItem("username");
    return token && username ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userTurnoId");
      localStorage.removeItem("userFullName");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    if (!role) return Promise.resolve({});

    return Promise.resolve({
      role: role,
      userId: userId,
      canEdit: role === "administrador" || role === "jefe_turno",
      canDelete: role === "administrador",
      canViewAllReports: role === "administrador",
      canCreateReports: true,
    });
  },
};

export default authProvider;
