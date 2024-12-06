import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { Folder } from "./types";

/**
 * Fetches the folders from Firestore database under the specified users collection.
 * @params - The UID of the logged-in user.
 * @return - A promise that resolves to an array of folders.
 */

export const fetchFolders = async (userId: string): Promise<Folder[]> => {
  try {
    const folderCollection = collection(db, "users", userId, "userFolders");

    const folderSnapshot = await getDocs(folderCollection);

    const folderList: Folder[] = folderSnapshot.docs.map((doc) => {
      const folderData = doc.data();
      console.log("Fetched Folder Data:", folderData);
      return {
        id: doc.id,
        ...folderData,
      } as Folder;
    });

    return folderList;
  } catch (error) {
    console.error("Error fetching folders: ", error);
    throw error;
  }
};
