import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { NewFolder } from "./types";

/**
 * Creates a new folder in the Firestore database under the users collection.
 *
 * @params userId - The UID of the logged-in user.
 * @params folderData - The data for the new folder (title, description, etc.).
 * @return - A promise resolving to the document ID of the created folder.
 */

export const createFolder = async (
  userId: string,
  folderData: NewFolder
): Promise<string> => {
  try {
    const folderCollection = collection(db, "users", userId, "userFolders");

    const docRef = await addDoc(folderCollection, folderData);
    console.log(`Folder created with ID: ${docRef.id}`);

    return docRef.id;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};
