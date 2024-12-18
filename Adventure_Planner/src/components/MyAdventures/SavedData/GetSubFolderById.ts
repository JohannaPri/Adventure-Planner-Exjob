import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

/**
 * Fetches a subfolder by its ID from the Firestore database.
 * 
 * @param userId - The ID of the user.
 * @param parentFolderId - The ID of the parent folder.
 * @param subFolderId - The ID of the subfolder to fetch.
 * 
 * @returns A Promise resolving to an object containing the subfolder's title or null if not found.
 */

export const getSubFolderById = async (
    userId: string,
    parentFolderId: string,
    subFolderId: string,
) : Promise<{ title: string } | null> => {
    try {
        const subFolderRef = doc(
            db,
            "users",
            userId,
            "userFolders",
            parentFolderId,
            "subFolders",
            subFolderId
        );

        const subFolderSnap = await getDoc(subFolderRef);

        if (subFolderSnap.exists()) {
            return subFolderSnap.data() as { title: string };
        } else {
            console.error("Subfolder not found");
            return null;
        }
    } catch(error) { 
        console.error("Error fetching subfolder:", error);
        throw error;
    }
};