import type { User } from '../types/auth';

const STORAGE_KEY = 'foodie_user';

// Sessions saved before the backend issued JWTs have no token and can't call protected APIs,
// so treat them as logged out.
export const loadStoredUser = (): User | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const user = saved ? (JSON.parse(saved) as User) : null;
    return user?.token ? user : null;
  } catch {
    return null;
  }
};

export const saveStoredUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const clearStoredUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
