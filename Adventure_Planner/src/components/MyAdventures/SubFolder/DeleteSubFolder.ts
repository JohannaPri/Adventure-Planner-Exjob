import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

/**
 * Deletes a subfolder from the Firestore database under the specified user's collection.
 *
 * @param userId - The UID of the logged-in user.
 * @param folderId - The ID of the parent folder.
 * @param subFolderId - The ID of the subfolder to be deleted.
 * @returns A promise that resolves when the subfolder is deleted.
 */

export const deleteSubFolder = async (
  userId: string,
  parentFolderId: string,
  subFolderId: string
) => {
  console.log(userId, parentFolderId, subFolderId);
  try {
    const subFolderDocRef = doc(
      db,
      "users",
      userId,
      "userFolders",
      parentFolderId,
      "subFolders",
      subFolderId
    );

    console.log("Firestore path for deletion:", subFolderDocRef.path);

    const subFolderSnapshot = await getDocs(
      collection(subFolderDocRef, "subFolders")
    );

    subFolderSnapshot.forEach(async (subFolderDoc) => {
      await deleteDoc(subFolderDoc.ref);
    });

    await deleteDoc(subFolderDocRef);

    console.log("Subfolder successfully deleted.");
  } catch (error) {
    console.error("Error deleting subfolder:", error);
    throw error;
  }
};
