import { db } from "../../../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * Fetches subfolders for a given user and parent folder from Firestore.
 *
 * This function queries the Firestore database to retrieve all subfolders for a specific user
 * and parent folder, based on the provided `userId` and `parentFolderId`. The query filters
 * the subfolders collection by the user ID and the parent folder ID.
 *
 * @param userId - The ID of the user whose subfolders are to be fetched.
 * @param parentFolderId - The ID of the parent folder to filter the subfolders.
 * @returns A promise that resolves to an array of subfolder data.
 */

export const fetchSubFolders = async (
  userId: string,
  parentFolderId: string
) => {
  try {
    const subFolderRef = collection(db, "subFolders");
    const q = query(
      subFolderRef,
      where("userId", "==", userId),
      where("parentFolderId", "==", parentFolderId)
    );
    const querySnapshot = await getDocs(q);

    const subFolders = querySnapshot.docs.map((doc) => doc.data());
    return subFolders;
  } catch (error) {
    throw new Error("Error fetching subfolders");
  }
};
