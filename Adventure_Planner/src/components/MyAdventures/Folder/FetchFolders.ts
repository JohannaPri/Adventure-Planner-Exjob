import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { Folder } from "../types";

/**
 * Fetches the folders from Firestore under the specified user's collection.
 *
 * @param userId - The UID of the logged-in user.
 * @returns A promise that resolves to an array of folders.
 */


export const fetchFolders = async (userId: string): Promise<Folder[]> => {
  try {

    const folderCollection = collection(db, "users", userId, "userFolders");

    const subFolderQuery = query(folderCollection, orderBy("createdAt", "desc"));

    const folderSnapshot = await getDocs(subFolderQuery);

    const folderList: Folder[] = folderSnapshot.docs.map((doc) => {
      const folderData = doc.data();
      console.log("Fetched Folder Data:", folderData);
      return {
        id: doc.id,
        ...folderData,
      } as Folder;
    });

    console.log(`Fetched ${folderList.length} folders`);
    console.log(`FOLDER-LIST: `, folderList.map((folder) => folder.id));
    return folderList;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};