import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import { arrayRemove, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Hotel } from "../../types/types";

export const removeAccommodationFromDb = async (accommodation: Hotel, folderId: string) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("No user os logged in");
        }

        const userId = user.uid;

        const subFoldersRef = collection(db, `users/${userId}/userFolders/${folderId}/subFolders`);

        const q = query(subFoldersRef, where("itemId", "==", 2));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            throw new Error("No document found with itemId = 2"); 
        }

        const docRef = snapshot.docs[0].ref;

        await updateDoc(docRef, {
            data: arrayRemove(accommodation),
        });

        console.log("Successfully removed accommodation from the data array!");
    } catch (error) { 
        console.error("Error removing accommodation data: ", error);
    }
};