import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

/**
 * Deletes a folder from the Firestore database under the specified users collection.
 *
 * @params userId - The UID of the logged-in user.
 * @params folderId - The ID of the folder to be deleted.
 * @returns - A promise that resolves when the folder is deleted.
 */

export const deleteFolder = async (
  userId: string,
  folderId: string
): Promise<void> => {
  try {
    const folderDocRef = doc(db, "users", userId, "userFolders", folderId);

    await deleteDoc(folderDocRef);
    console.log(`Folder with ID ${folderId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
};
