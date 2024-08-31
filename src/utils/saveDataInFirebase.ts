import { ref, set } from 'firebase/database';
import { db } from '@/firebase';

export const writeUserData = (userId: string, name: string, email: string) => {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
};
