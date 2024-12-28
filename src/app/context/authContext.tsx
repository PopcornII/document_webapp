// context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

type User = {
  id: number;
  role: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decodedUser = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUser(decodedUser);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    const decodedUser = JSON.parse(atob(token.split('.')[1]));
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};