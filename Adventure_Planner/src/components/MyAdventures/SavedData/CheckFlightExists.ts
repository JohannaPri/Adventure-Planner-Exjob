import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { FormattedFlightData } from '../../../utils/formattedFlightData';
import { getAuth } from 'firebase/auth';

/**
 * Checks if a specific flight already exists within a given folder.
 * 
 * This function fetches the subfolders in the given folder from Firestore and checks if
 * the flight (passed as a parameter) already exists within the stored data.
 * It verifies the presence of the flight by comparing its flight ID with the one stored in the database.
 *
 * @param flight - The flight object to check for existence in the folder.
 * @param folderId - The ID of the folder where the flight should be checked.
 * @returns A promise that resolves to `true` if the flight exists, `false` otherwise.
 */

const checkIfFlightExists = async (flight: FormattedFlightData, folderId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const subFoldersRef = collection(db, `users/${userId}/userFolders/${folderId}/subFolders`);

    const q = query(subFoldersRef, where("itemId", "==", 1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("No document found with itemId = 1");
    }

    for (const docSnap of snapshot.docs) {
      const subFolderData = docSnap.data();
      const data = subFolderData?.data || [];

      console.log('DATA FROM CHECK FLIGH EXISTS: ', data);

      const flightExists = data.some((storedFlight: FormattedFlightData) => storedFlight.flight_id === flight.flight_id);

      if (flightExists) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error fetching document:', error);
    return false;
  }
};

export default checkIfFlightExists;