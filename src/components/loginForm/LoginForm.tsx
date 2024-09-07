'use client';

import React, { useState } from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage';

export const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { updateToken } = useAuth();

  const handleErrorReset = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: true }),
      });
      const user = await response.json();
      if (user.token) {
        updateToken(user.token);
        router.replace('/');
      } else {
        setError(user.error || 'An unexpected error occurred. Please try again later.');
      }
    } catch (e) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };
  return (
    <>
      {error && <ErrorMessage message={error} errorReset={handleErrorReset} />}
      <Form handleFormSubmit={login} />
    </>
  );
};
