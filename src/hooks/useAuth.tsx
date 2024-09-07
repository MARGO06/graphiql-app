'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthContextType } from '@/types/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

type AuthProviderProps = {
  children: ReactNode;
  initialToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialToken }) => {
  const [token, setToken] = useState<string | null>(initialToken);

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const logout = async () => {
    await fetch('/api/deleteToken', {
      method: 'DELETE',
      credentials: 'include',
    });
    setToken(null);
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
