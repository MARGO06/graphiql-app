import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-Z]/, 'first letter must be uppercase'),
  email: yup
    .string()
    .required()
    .email('please enter a valid email address')
    .matches(/^(?:(?!\.{2,})[a-zA-Z0-9.-])+@/, 'email cannot have consecutive dots before @'),
  password: yup
    .string()
    .required()
    .min(8, 'password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'password should contain at least 1 letter')
    .matches(/\d/, 'password should contain at least 1 digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'password must contain at least 1 special character'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
