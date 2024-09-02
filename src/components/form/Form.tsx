'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDates } from '@/types/formDates';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import style from '@/components/form/Form.module.scss';
import { useSchemaSignIn } from '@/hooks/useSchemaSignIn';
import { useSchemaSignUp } from '@/hooks/useSchemaSignUp';

type FormProps = {
  handleFormSubmit: (email: string, password: string, name?: string) => void;
};

export const Form: React.FC<FormProps> = ({ handleFormSubmit }) => {
  const pathname = usePathname();
  const schemaSignIn = useSchemaSignIn();
  const schemaSignUp = useSchemaSignUp();
  const t = useTranslations('SignIn/SignUp');

  const schema = pathname === '/signUp' ? schemaSignUp : schemaSignIn;
  const defaultValues: FormDates = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

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
    handleFormSubmit(data.email, data.password, data.name);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={style.formRegistration}>
      {pathname === '/signUp' && (
        <>
          <label htmlFor="name" className={style.labelName}>
            {t('name')}
          </label>
          <input
            {...register('name')}
            placeholder={t('enter your name')}
            type="text"
            className={style.inputForm}
            id="name"
          />
          <div className={style.errorContener}>
            <p className={`${style.error} ${errors.name ? style.visible : style.hidden}`}>
              {errors.name?.message}
            </p>
          </div>
        </>
      )}
      <label htmlFor="email" className={style.labelEmail}>
        {t('email')}
      </label>
      <input
        {...register('email')}
        placeholder={t('enter your email')}
        type="email"
        className={style.inputForm}
        id="email"
      />
      <div className={style.errorContener}>
        <p className={`${style.error} ${errors.email ? style.visible : style.hidden}`}>
          {errors.email?.message}
        </p>
      </div>
      <label htmlFor="password" className={style.labelPassword}>
        {t('password')}
      </label>
      <input
        {...register('password')}
        placeholder={t('enter your password')}
        type="password"
        className={style.inputForm}
        id="password"
      />
      <div className={style.errorContener}>
        <p className={`${style.error} ${errors.password ? style.visible : style.hidden}`}>
          {errors.password?.message}
        </p>
      </div>
      {pathname === '/signUp' && (
        <>
          <label htmlFor="confirmPassword" className={style.labelConfirmPassword}>
            {t('confirm password')}
          </label>
          <input
            {...register('confirmPassword')}
            placeholder={t('enter your password')}
            type="password"
            className={style.inputForm}
            id="confirmPassword"
          />
          <div className={style.errorContener}>
            <p
              className={`${style.error} ${errors.confirmPassword ? style.visible : style.hidden}`}
            >
              {errors.confirmPassword?.message}
            </p>
          </div>
        </>
      )}
      <button type="submit" className={style.submit}>
        {t('submit')}
      </button>
    </form>
  );
};
