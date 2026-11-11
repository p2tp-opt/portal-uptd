import { createContext } from 'react';

export interface AdminUser {
  email: string;
  name: string;
  role: 'operator' | 'admin';
}

export interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
