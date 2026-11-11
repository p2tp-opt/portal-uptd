import React, { useState, useEffect } from 'react';
import { AuthContext, AdminUser } from './auth-context';

const AUTH_STORAGE_KEY = 'p2tp_admin_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, pass: string) => {
    if (
      (email === 'operator@p2tp.kaltimprov.go.id' ||
        email === 'admin@p2tp.kaltimprov.go.id' ||
        email === 'admin') &&
      pass === 'admin123'
    ) {
      const loggedUser: AdminUser = {
        email,
        name: 'Operator Teknis P2TP',
        role: 'operator',
      };
      setUser(loggedUser);
      return { success: true };
    }
    return {
      success: false,
      error: 'Email atau kata sandi tidak cocok. Gunakan operator@p2tp.kaltimprov.go.id / admin123',
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
