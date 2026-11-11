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

  const login = async (usernameOrEmail: string, pass: string) => {
    const input = usernameOrEmail.trim().toLowerCase();
    if (
      (input === 'operatorp2tp' ||
        input === 'operatorp2tp@kaltimprov.go.id' ||
        input === 'operator@p2tp.kaltimprov.go.id' ||
        input === 'admin') &&
      pass === 'admin123'
    ) {
      const loggedUser: AdminUser = {
        email: 'operatorp2tp@kaltimprov.go.id',
        name: 'Operator Teknis P2TP',
        role: 'operator',
      };
      setUser(loggedUser);
      return { success: true };
    }
    return {
      success: false,
      error: 'ID Operator atau kata sandi tidak cocok. Silakan periksa kembali.',
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
