'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignIn } from '@/utils/schemaSignIn';
import { schemaSignUp } from '@/utils/schemaSignUp';
import { FormDates } from '@/types/formDates';
import { usePathname } from 'next/navigation';
import style from '@/components/form/Form.module.scss';

type FormProps = {
  handleFormSubmit: (email: string, password: string) => void;
};

export const Form: React.FC<FormProps> = ({ handleFormSubmit }) => {
  const pathname = usePathname();

  const schema = pathname === '/signUp' ? schemaSignUp : schemaSignIn;
  const defaultValues: FormDates =
    pathname === '/signUp'
      ? { name: '', email: '', password: '', confirmPassword: '' }
      : { name: '', email: '', password: '', confirmPassword: '' };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDates>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmitHandler = (data: FormDates) => {
    handleFormSubmit(data.email, data.password);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={style.formRegistration}>
      {pathname === '/signUp' && (
        <>
          <label htmlFor="name" className={style.labelName}>
            Name
          </label>
          <input
            {...register('name')}
            placeholder="Enter your name"
            type="text"
            className={style.inputForm}
            id="name"
          />
          <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
            {errors.name?.message}
          </p>
        </>
      )}
      <label htmlFor="email" className={style.labelEmail}>
        Email
      </label>
      <input
        {...register('email')}
        placeholder="Enter your email"
        type="email"
        className={style.inputForm}
        id="email"
      />
      <p className={`${style.error} ${errors.email ? style.visible : style.hidden}`}>
        {errors.email?.message}
      </p>
      <label htmlFor="password" className={style.labelPassword}>
        Password
      </label>
      <input
        {...register('password')}
        placeholder="Enter your password"
        type="password"
        className={style.inputForm}
        id="password"
      />
      <p className={`${style.error} ${errors.password ? style.visible : style.hidden}`}>
        {errors.password?.message}
      </p>
      {pathname === '/signUp' && (
        <>
          <label htmlFor="confirmPassword" className={style.labelConfirmPassword}>
            Confirm password
          </label>
          <input
            {...register('confirmPassword')}
            placeholder="Enter your password"
            type="password"
            className={style.inputForm}
            id="confirmPassword"
          />
          <p className={`${style.error} ${errors.confirmPassword ? style.visible : style.hidden}`}>
            {errors.confirmPassword?.message}
          </p>
        </>
      )}
      <button type="submit" className={style.submit}>
        Submit
      </button>
    </form>
  );
};
