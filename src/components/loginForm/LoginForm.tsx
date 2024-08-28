'use client';

import React from 'react';
import { Form } from '@/components/form/Form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { authenticate } from '@/utils/authorization';
import { tokenGet } from '@/lib/features/activeToken.slice';

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const token = await authenticate(email, password, true);
      if (token) {
        dispatch(tokenGet(token));
        router.replace('/');
      }
    } catch (error) {
      //TODO
    }
  };

  return <Form handleFormSubmit={login} />;
};