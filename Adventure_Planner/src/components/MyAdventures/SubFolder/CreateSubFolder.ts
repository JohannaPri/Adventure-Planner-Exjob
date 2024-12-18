import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

/**
 * Creates a new subfolder under the specified parent folder.
 *
 * @param userId - The UID of the logged-in user.
 * @param parentFolderId - The document ID of the parent folder.
 * @param subFolderData - The data for the new subfolder (e.g., title, description).
 * @returns A promise resolving to the document ID of the created subfolder.
 */

export const createSubFolder = async (
  userId: string,
  parentFolderId: string,
  subFolderData: { title: string; title2?: string }
): Promise<string> => {
  try {
    const subFolderCollection = collection(
      db,
      "users",
      userId,
      "userFolders",
      parentFolderId,
      "subFolders"
    );

    const docRef = await addDoc(subFolderCollection, subFolderData);
    console.log(`Subfolder created with ID: ${docRef.id}`);

    return docRef.id;
  } catch (error) {
    console.error("Error creating subfolder:", error);
    throw error;
  }
};

/**
 * Creates default subfolders under the specified parent folder.
 *
 * @param userId - The UID of the logged-in user.
 * @param parentFolderId - The document ID of the parent folder.
 * @returns A promise resolving when all subfolders are created.
 */

export const createDefaultSubFolders = async (
  userId: string,
  parentFolderId: string
): Promise<void> => {
  const defaultSubFolders = [
    { itemId: 1, priority: 1, typeId: 1, title: "Flight", data: [] },
    { itemId: 2, priority: 2, typeId: 2, title: "Accommodation", data: [] },
    { itemId: 3, priority: 3, typeId: 3, title: "Activities", data: [] },
    {
      itemId: 4,
      priority: 4,
      typeId: 4,
      title: "Wanderlist",
      title2: "My Wanderlist",
      data: [],
    },
  ];

  try {
    const sortedSubFolders = defaultSubFolders.sort(
      (a, b) => a.priority - b.priority
    );
    const creationPromises = sortedSubFolders.map((subFolder) =>
      createSubFolder(userId, parentFolderId, subFolder)
    );
    const subFolderIds = await Promise.all(creationPromises);

    console.log("All subfolders created with IDs:", subFolderIds);
  } catch (error) {
    console.error("Error creating default subfolders:", error);
    throw error;
  }
};
