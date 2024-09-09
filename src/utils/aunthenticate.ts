import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { Translations } from '@/types/translationErrors';
import { handleFirebaseError } from '@/utils/firebaseError';

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
