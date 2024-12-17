import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import { arrayUnion, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Hotel } from "../../types/types";

export const saveAccommodationToDb = async (hotel: Hotel, folderId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("No user is logged in");
      }
  
      const userId = user.uid;
  
      const subFoldersRef = collection(
        db,
        `users/${userId}/userFolders/${folderId}/subFolders`
      );
  
      const q = query(subFoldersRef, where("itemId", "==", 2));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        throw new Error("No document found with itemId = 2");
      }
  
      const docRef = snapshot.docs[0].ref;
  
      await updateDoc(docRef, {
        data: arrayUnion(hotel),
      });
  
      console.log("Successfully added accommodation to the data array!");
    } catch (error) {
      console.error("Error saving accommodation data:", error);
      throw error;
    }
  };