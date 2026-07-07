import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/user";

const API_URL = "http://localhost:8000/auth";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);

  const response = await axios.post<LoginResponse>(
    `${API_URL}/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  // Save JWT token
  localStorage.setItem("token", response.data.access_token);

  return response.data;
};

export const register = async (
  user: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    `${API_URL}/register`,
    user
  );

  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};