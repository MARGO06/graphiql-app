import Cookies from 'js-cookie';
import { saveOneHour } from '@/utils/saveTokenOneHour';

const COOKIE_NAME = 'JWT';

export const saveToken = (token: string) => {
  return Cookies.set(COOKIE_NAME, token, {
    expires: saveOneHour,
    sameSite: 'strict',
    path: '/',
    secure: true,
  });
};

export const getTokenFromCookie = () => {
  return Cookies.get(COOKIE_NAME);
};

export const removeTokenFromCookie = () => {
  return Cookies.remove(COOKIE_NAME, { path: '/' });
};
