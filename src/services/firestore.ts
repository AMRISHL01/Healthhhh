import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const createUserDocument = async (uid: string, data: any) => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  try {
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};
