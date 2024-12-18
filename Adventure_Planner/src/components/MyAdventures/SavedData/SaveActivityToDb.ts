import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Activity } from "../../types/types";

/**
 * Saves an activity to the user's subfolder in the database.
 *
 * @param activity - The activity object to be saved.
 * @param folderId - The ID of the folder containing the subfolder where the activity will be added.
 *
 * @throws Will throw an error if no user is logged in, or if no matching document is found in the Firestore database.
 */

export const saveActivityToDb = async (
  activity: Activity,
  folderId: string
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in");
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
      data: arrayUnion(activity),
    });

    console.log("Successfully added activity to the data array!");
  } catch (error) {
    console.error("Error saving activity data:", error);
    throw error;
  }
};
