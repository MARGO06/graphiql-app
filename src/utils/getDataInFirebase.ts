import { getDatabase, ref, child, get } from 'firebase/database';

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
