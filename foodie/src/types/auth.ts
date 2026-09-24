export type Role = 'CUSTOMER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  token: string;
}

export interface AuthResponse extends User {
  message: string;
}
