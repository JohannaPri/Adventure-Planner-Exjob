import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase-config";
import { arrayUnion, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FormattedFlightData } from "../../../utils/formattedFlightData";

export const saveFlightToDb = async (flight: FormattedFlightData, folderId: string) => {
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
  
      const q = query(subFoldersRef, where("itemId", "==", 1));
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        throw new Error("No document found with itemId = 1");
      }
  
      const docRef = snapshot.docs[0].ref;
  
      await updateDoc(docRef, {
        data: arrayUnion(flight),
      });
  
      console.log("Successfully added flight to the data array!");
    } catch (error) {
      console.error("Error saving flight data:", error);
      throw error;
    }
  };