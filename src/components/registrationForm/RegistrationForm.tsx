'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/services/token';
import { authenticate } from '@/utils/aunthenticate';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const registration = async (email: string, password: string) => {
    try {
      const token = await authenticate(email, password, false);
      if (token) {
        saveToken(token);
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={registration} />;
};
