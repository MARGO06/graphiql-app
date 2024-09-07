'use client';

import React, { useState } from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { writeUserData } from '@/utils/saveDataInFirebase';
import { useAuth } from '@/hooks/useAuth';
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage';

export const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { updateToken } = useAuth();
  const router = useRouter();

  const handleErrorReset = () => {
    setError(null);
  };

  const registration = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: false }),
      });

      const user = await response.json();

      if (user.token) {
        updateToken(user.token);
        if (name) writeUserData(user.uid, name, email);
        router.replace('/');
      } else {
        setError(user.error);
      }
    } catch (e) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      {error && <ErrorMessage message={error} errorReset={handleErrorReset} />}
      <Form handleFormSubmit={registration} />
    </>
  );
};
