import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

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
    // TODO: Handle error
  }
};
