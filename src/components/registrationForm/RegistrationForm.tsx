'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/services/token';
import { authenticate } from '@/utils/aunthenticate';
import { writeUserData } from '@/utils/saveDataInFirebase';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const registration = async (email: string, password: string, name?: string) => {
    try {
      const user = await authenticate(email, password, false);
      if (user?.token) {
        saveToken(user.token);
        if (name) writeUserData(user.uid, name, email);
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={registration} />;
};
