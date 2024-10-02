import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { Translations } from '@/types/translationErrors';

export const handleFirebaseError = (error: FirebaseError, translations: Translations) => {
  if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
    throw { status: 401, message: translations.errors['auth/wrong-password'] };
  }
  if (error.code === 'auth/too-many-requests') {
    throw { status: 429, message: translations.errors['auth/too-many-requests'] };
  }
  if (error.code === 'auth/invalid-credential') {
    throw { status: 400, message: translations.errors['auth/invalid-credential'] };
  }
  if (error.code === 'auth/email-already-in-use') {
    throw {
      status: 400,
      message: translations.errors['auth/email-already-in-use'],
    };
  }
  throw { status: 500, message: translations.errors['internal-server-error'] };
};

export const authenticate = async (
  email: string,
  password: string,
  isLogin: boolean,
  translations: Translations,
) => {
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
      handleFirebaseError(error, translations);
    }
    throw { status: 500, message: translations.errors['internal-server-error'] };
  }
};
