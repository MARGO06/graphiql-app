'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { writeUserData } from '@/utils/saveDataInFirebase';
import { readUserData } from '@/utils/getDataInFirebase';
import { useAuth } from '@/hooks/useAuth';

export const RegistrationForm: React.FC = () => {
  const { updateToken, updateUserName } = useAuth();
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
        updateToken(user.token);
        if (name) writeUserData(user.uid, name, email);
        const userData = await readUserData(user.uid);
        updateUserName(userData.username);
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={registration} />;
};
