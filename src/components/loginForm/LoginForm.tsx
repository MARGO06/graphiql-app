'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';

export const LoginForm: React.FC = () => {
  const router = useRouter();

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
        // const data = await response.json();
        router.replace('/');
      } else {
        //TODO
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={login} />;
};
