import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const useSchemaSignIn = () => {
  const t = useTranslations('SignIn/SignUp');

  return yup.object().shape({
    email: yup
      .string()
      .required(t('email is required'))
      .email(t('please enter a valid email address')),
    password: yup.string().required(t('password is required')),
  });
};
