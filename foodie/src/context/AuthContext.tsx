import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { AuthResponse, User } from '../types/auth';
import { clearStoredUser, loadStoredUser, saveStoredUser } from '../services/authStorage';

interface AuthContextType {
  user: User | null;
  login: (userData: AuthResponse) => void;
  logout: () => void;
  isAdmin: boolean;
  isCustomer: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(loadStoredUser);

  const login = ({ id, name, email, mobile, role, token }: AuthResponse) => {
    const userData: User = { id, name, email, mobile, role, token };
    // Drop anything cached for a previous user (e.g. their orders)
    queryClient.clear();
    setUser(userData);
    saveStoredUser(userData);
  };

  const logout = () => {
    queryClient.clear();
    setUser(null);
    clearStoredUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin: user?.role === 'ADMIN',
        isCustomer: user?.role === 'CUSTOMER',
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
