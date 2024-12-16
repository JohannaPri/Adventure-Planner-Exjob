import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import { arrayRemove, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Activity } from "../../types/types";

export const removeActivityFromDb = async (activity: Activity, folderId: string) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("No user os logged in");
        }

        const userId = user.uid;

        const subFoldersRef = collection(db, `users/${userId}/userFolders/${folderId}/subFolders`);

        const q = query(subFoldersRef, where("itemId", "==", 3));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            throw new Error("No document found with itemId = 3"); 
        }

        const docRef = snapshot.docs[0].ref;

        await updateDoc(docRef, {
            data: arrayRemove(activity),
        });

        console.log("Successfully removed activity from the data array!");
    } catch (error) { 
        console.error("Error removing activity data: ", error);
    }
};