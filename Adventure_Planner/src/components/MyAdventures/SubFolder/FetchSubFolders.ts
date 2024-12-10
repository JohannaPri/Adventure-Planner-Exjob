import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

/**
 * Fetches subfolders from Firestore for a given user and parent folder.
 * 
 * @param userId - The ID of the logged-in user.
 * @param folderId - The ID of the parent folder.
 * @returns A promise that resolves to an array of subfolder objects.
 * @throws An error if the userId or folderId is missing, or if the Firestore fetch fails.
 */

export const fetchSubFolders = async (
  userId: string,
  folderId: string
): Promise<SubFolder[]> => {
  if (!userId || !folderId) {
    throw new Error("User ID or Folder ID is missing");
  }

  try {
    const subFolderCollectionRef = collection(
      db,
      "users",
      userId,
      "userFolders",
      folderId,
      "subfolders"
    );

    const snapshot = await getDocs(subFolderCollectionRef);

    if (snapshot.empty) {
      console.warn(`No subfolders found for folder ID: ${folderId}`);
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        folderTitle: data.folderTitle || "Untitled Folder",
        creationDate: data.creationDate || new Date().toISOString(),
        ...data,
      } as SubFolder;
    });
  } catch (error) {
    console.error("Error fetching subfolders:", error);
    throw error;
  }
};

export interface SubFolder {
  id: string;
  folderTitle: string;
  creationDate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
