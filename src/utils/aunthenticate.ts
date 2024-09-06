import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';

export const authenticate = async (email: string, password: string, isLogin: boolean) => {
  try {
    let userCredential;
    if (isLogin) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    }
    const user = userCredential.user;
    const token = await user.getIdToken();
    const uid = user.uid;

    return { token, uid };
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw { status: 401, message: 'Authentication failed' };
      }
      if (error.code === 'auth/too-many-requests') {
        throw { status: 429, message: 'Too many requests. Please try again later.' };
      }
      if (error.code === 'auth/invalid-credential') {
        throw { status: 400, message: 'Invalid credentials provided.' };
      }
      if (error.code === 'auth/email-already-in-use') {
        throw {
          status: 400,
          message: 'Email already in use. Please use a different email address.',
        };
      }
    }

    throw { status: 500, message: 'Internal server error' };
  }
};
