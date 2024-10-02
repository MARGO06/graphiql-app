import { getDatabase, ref, child, get, set } from 'firebase/database';
import { db } from '@/firebase';

export const readUserData = async (userId: string) => {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const writeUserData = (userId: string, name: string, email: string) => {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
};
