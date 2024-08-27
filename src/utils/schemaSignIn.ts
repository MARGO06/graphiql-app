import * as yup from 'yup';

export const schemaSignIn = yup.object().shape({
  email: yup.string().required().email('please enter a valid email address'),
  password: yup.string().required(),
});
