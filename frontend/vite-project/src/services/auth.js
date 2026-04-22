import { jwtDecode } from 'jwt-decode'; // Assume installed or mock

// Mock user - logged in admin
export const getCurrentUser = () => {
  return {
    id: 1,
    name: 'Admin User',
    email: 'admin@temple.com',
    role: 'admin',
    permissions: ['*']
  };
};

export const isAuthenticated = () => true;

export const login = async (credentials) => {
  // Mock login success
  localStorage.setItem('token', 'mock-jwt-token');
  return { token: 'mock-jwt-token', user: getCurrentUser() };
};

export const logout = () => {
  localStorage.removeItem('token');
};

