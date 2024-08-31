'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/utils/aunthenticate';
import { saveToken } from '@/services/token';

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const user = await authenticate(email, password, true);
      if (user?.token) {
        saveToken(user.token);
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={login} />;
};
