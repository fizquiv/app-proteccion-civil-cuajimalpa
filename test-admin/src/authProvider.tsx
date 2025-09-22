import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    try {
      // Fetch users from the JSON server
      const response = await fetch(
        `${import.meta.env.VITE_JSON_SERVER_URL}/users`,
      );

      if (!response.ok) {
        throw new Error("No se pudo conectar con el servidor");
      }

      const users = await response.json();

      // Find user with matching username and password
      const user = users.find(
        (u: any) => u.username === username && u.password === password,
      );

      if (!user) {
        throw new Error(
          "Credenciales incorrectas. Verifique su usuario y contraseña.",
        );
      }

      // Store user information in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userTurnoId", user.turnoId?.toString() || "");

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
  async logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userTurnoId");
  },
  // called when the API returns an error
  async checkError({ status }: { status: number }) {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userTurnoId");
      throw new Error("La sesión ha expirado");
    }
  },
  // called when the user navigates to a new location, to check for authentication
  async checkAuth() {
    if (!localStorage.getItem("username")) {
      throw new Error("Inicio de sesión requerido");
    }
  },
  // Get current user permissions
  async getPermissions() {
    const role = localStorage.getItem("userRole");
    return role ? [role] : [];
  },
};
