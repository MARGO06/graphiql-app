'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { writeUserData } from '@/utils/saveDataInFirebase';

export const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const registration = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch('/api/saveToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin: false }),
      });
      if (response.ok) {
        const user = await response.json();
        if (name) writeUserData(user.uid, name, email);
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={registration} />;
};
