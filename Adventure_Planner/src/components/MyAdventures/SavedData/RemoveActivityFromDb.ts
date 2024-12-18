import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import {
  arrayRemove,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Activity } from "../../types/types";

/**
 * Removes an activity from the user's subfolder in the database.
 *
 * @param activity - The activity object to be removed.
 * @param folderId - The ID of the folder containing the subfolder from which the activity will be removed.
 *
 * @throws Will throw an error if no user is logged in, or if no matching document is found in the Firestore database.
 */

export const removeActivityFromDb = async (
  activity: Activity,
  folderId: string
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user os logged in");
    }

    const userId = user.uid;

    const subFoldersRef = collection(
      db,
      `users/${userId}/userFolders/${folderId}/subFolders`
    );

    const q = query(subFoldersRef, where("itemId", "==", 3));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("No document found with itemId = 3");
    }

    const docRef = snapshot.docs[0].ref;

    await updateDoc(docRef, {
      data: arrayRemove(activity),
    });

    console.log("Successfully removed activity from the data array!");
  } catch (error) {
    console.error("Error removing activity data: ", error);
  }
};
