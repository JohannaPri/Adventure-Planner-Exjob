import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { Activity } from '../../types/types';
import { getAuth } from 'firebase/auth';

const checkIfActivityExists = async (activity: Activity, folderId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const subFoldersRef = collection(db, `users/${userId}/userFolders/${folderId}/subFolders`);

    const q = query(subFoldersRef, where("itemId", "==", 2));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("No document found with itemId = 2");
    }

    for (const docSnap of snapshot.docs) {
      const subFolderData = docSnap.data();
      const data = subFolderData?.data || [];

      console.log('DATA FROM CHECK ACTIVITY EXISTS: ', data);

      const activityExists = data.some((storedActivity: Activity) => storedActivity.id === activity.id);

      if (activityExists) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error fetching document:', error);
    return false;
  }
};

export default checkIfActivityExists;