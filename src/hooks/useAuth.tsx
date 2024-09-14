'use client';
import React, { createContext, useState, useContext, ReactNode /*, useEffect */ } from 'react';
import { AuthContextType } from '@/types/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
//import { useRouter } from 'next/navigation';

type AuthProviderProps = {
  children: ReactNode;
  initialToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialToken }) => {
  const [token, setToken] = useState<string | null>(initialToken);
  const [userName, setUserName] = useState<string | null>(null);

  // const router = useRouter();

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const updateUserName = (newName: string) => {
    setUserName(newName);
  };

  /* useEffect(() => {
    const checkToken = async () => {
      const response = await fetch('/api/checkToken', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();

      if (data.token) {
        setToken(data.token);
      }

      if (!data.token) {
        setToken(null);
        router.replace('/');
      }
    };
    checkToken();

    const interval = setInterval(checkToken, 1000 * 1800);
    return () => clearInterval(interval);
  }, [router]); */

  const logout = async () => {
    await fetch('/api/deleteToken', {
      method: 'DELETE',
      credentials: 'include',
    });
    setToken(null);
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, logout, updateUserName, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
