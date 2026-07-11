import axios from "axios";

// Backend URL
const API_URL = "http://127.0.0.1:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login
export const login = async (loginData: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", loginData);

  // Save token
  if (response.data.access_token) {
    localStorage.setItem("token", response.data.access_token);
  }

  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Export axios instance
export default api;