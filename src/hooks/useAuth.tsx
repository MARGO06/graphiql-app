'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthContextType } from '@/types/authContext';
//import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/getToken', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        //TODO
      }
    };

    fetchToken();
  }, []);

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const logout = async () => {
    /* try {
      await fetch('/api/deleteToken', {
        method: 'DELETE',
      });

      setToken(null);
    } catch (error) {
      //todo
    }
    //signOut(auth); */
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
