import apiClient from '../api/axiosClient';
import type { Role } from '../types/auth';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  defaultAddress: string | null;
}

export interface UpdateProfileRequest {
  name: string;
  mobile: string;
  defaultAddress: string | null;
}

export const fetchMyProfile = async (): Promise<UserProfile> =>
  (await apiClient.get<UserProfile>('/users/me')).data;

export const updateMyProfile = async (profile: UpdateProfileRequest): Promise<UserProfile> =>
  (await apiClient.put<UserProfile>('/users/me', profile)).data;
