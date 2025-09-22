// Utility functions for user authentication and role management

export interface User {
  id: number;
  username: string;
  role: 'colaborador' | 'jefe_turno' | 'administrador';
  turnoId?: number;
}

export const getCurrentUser = (): User | null => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const userTurnoId = localStorage.getItem("userTurnoId");
  
  if (!username || !userId || !userRole) {
    return null;
  }
  
  return {
    id: parseInt(userId),
    username,
    role: userRole as User['role'],
    turnoId: userTurnoId ? parseInt(userTurnoId) : undefined,
  };
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};

export const isAdmin = (): boolean => {
  return getUserRole() === 'administrador';
};

export const isJefeTurno = (): boolean => {
  return getUserRole() === 'jefe_turno';
};

export const isColaborador = (): boolean => {
  return getUserRole() === 'colaborador';
};

export const canManageUsers = (): boolean => {
  const role = getUserRole();
  return role === 'administrador' || role === 'jefe_turno';
};

export const canCreateReports = (): boolean => {
  return getUserRole() !== null; // All authenticated users can create reports
};

export const canManageInsumos = (): boolean => {
  const role = getUserRole();
  return role === 'administrador' || role === 'jefe_turno';
};