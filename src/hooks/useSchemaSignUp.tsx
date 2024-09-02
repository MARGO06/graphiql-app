import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const useSchemaSignUp = () => {
  const t = useTranslations('SignIn/SignUp');

  return yup.object().shape({
    name: yup
      .string()
      .required(t('name is required'))
      .matches(/^[A-Z]/, t('first letter must be uppercase')),
    email: yup
      .string()
      .required(t('email is required'))
      .email(t('please enter a valid email address'))
      .matches(
        /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._-]+@/,
        t('email should not contain dots at the beginning @'),
      ),
    password: yup
      .string()
      .required(t('password is required'))
      .min(8, t('password must be at least 8 characters'))
      .matches(/[a-zA-Z]/, t('password should contain at least 1 letter'))
      .matches(/\d/, t('password should contain at least 1 digit'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('password must contain at least 1 special character')),
    confirmPassword: yup
      .string()
      .required(t('confirm password is required'))
      .oneOf([yup.ref(t('password'))], t('passwords must match')),
  });
};
