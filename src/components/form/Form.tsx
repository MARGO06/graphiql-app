'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils/schema';
import { FormDates } from '@/types/formDates';
import { usePathname } from 'next/navigation';
import style from '@/components/form/Form.module.scss';

export const Form: React.FC = () => {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDates>({ resolver: yupResolver(schema) });

  const onSubmitHandler = () => {
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
