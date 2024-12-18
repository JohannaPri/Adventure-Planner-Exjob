import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { Activity } from "../../types/types";
import { getAuth } from "firebase/auth";

/**
 * Checks if a specific activity already exists within a given folder.
 *
 * This function fetches the subfolders in the given folder using Firestore and checks if
 * the activity (passed as a parameter) already exists within the stored data.
 * It verifies the presence of the activity by comparing its ID with the one stored in the database.
 *
 * @param activity - The activity object to check for existence in the folder.
 * @param folderId - The ID of the folder where the activity should be checked.
 * @returns A promise that resolves to `true` if the activity exists, `false` otherwise.
 */

const checkIfActivityExists = async (activity: Activity, folderId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const subFoldersRef = collection(
      db,
      `users/${userId}/userFolders/${folderId}/subFolders`
    );

    const q = query(subFoldersRef, where("itemId", "==", 2));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("No document found with itemId = 2");
    }

    for (const docSnap of snapshot.docs) {
      const subFolderData = docSnap.data();
      const data = subFolderData?.data || [];

      console.log("DATA FROM CHECK ACTIVITY EXISTS: ", data);

      const activityExists = data.some(
        (storedActivity: Activity) => storedActivity.id === activity.id
      );

      if (activityExists) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error fetching document:", error);
    return false;
  }
};

export default checkIfActivityExists;
