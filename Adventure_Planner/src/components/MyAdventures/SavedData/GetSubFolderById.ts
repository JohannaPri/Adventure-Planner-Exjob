import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

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