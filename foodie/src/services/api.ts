import apiClient from '../api/axiosClient';
import type { AuthResponse } from '../types/auth';

export const registerApi = async (data: Record<string, any>): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const loginApi = async (credentials: Record<string, string>): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};
