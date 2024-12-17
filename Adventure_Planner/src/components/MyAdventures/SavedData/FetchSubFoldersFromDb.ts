import { db } from "../../../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchSubFolders = async (userId: string, parentFolderId: string) => {
    try {
        const subFolderRef = collection(db, "subFolders");
        const q = query(subFolderRef, where("userId", "==", userId), where ("parentFolderId", "==", parentFolderId));
        const querySnapshot = await getDocs(q);

        const subFolders = querySnapshot.docs.map((doc) => doc.data());
        return subFolders;
    } catch (error) {
        throw new Error("Error fetching subfolders");
    }
}