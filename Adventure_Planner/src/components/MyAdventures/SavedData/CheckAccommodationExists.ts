import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { Hotel } from "../../types/types";
import { getAuth } from "firebase/auth";

/**
 * Checks if a specific accommodation already exists within a given folder.
 *
 * This function fetches the subfolders in the given folder using Firestore and checks if
 * the accommodation (passed as a parameter) already exists within the stored data.
 * It verifies the presence of the accommodation by comparing its ID with the one stored in the database.
 *
 * @param accommodation - The hotel object to check for existence in the folder.
 * @param folderId - The ID of the folder where the accommodation should be checked.
 * @returns A promise that resolves to `true` if the accommodation exists, `false` otherwise.
 */

const checkIfAccommodationExists = async (
  accommodation: Hotel,
  folderId: string
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const subFoldersRef = collection(
      db,
      `users/${userId}/userFolders/${folderId}/subFolders`
    );

    const q = query(subFoldersRef, where("itemId", "==", 2));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("No document found with itemId = 2");
    }

    for (const docSnap of snapshot.docs) {
      const subFolderData = docSnap.data();
      const data = subFolderData?.data || [];

      console.log("DATA FROM CHECK ACCOMMODATION EXISTS: ", data);

      const accommodationExists = data.some(
        (storedAccommodation: Hotel) =>
          storedAccommodation.id === accommodation.id
      );

      if (accommodationExists) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error fetching document:", error);
    return false;
  }
};

export default checkIfAccommodationExists;
