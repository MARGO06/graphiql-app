'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { readUserData } from '@/utils/getDataInFirebase';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { updateToken, updateUserName } = useAuth();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: true }),
      });

      if (response.ok) {
        const user = await response.json();
        updateToken(user.token);
        router.replace('/');
        const userData = await readUserData(user.uid);
        updateUserName(userData.username);
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={login} />;
};
