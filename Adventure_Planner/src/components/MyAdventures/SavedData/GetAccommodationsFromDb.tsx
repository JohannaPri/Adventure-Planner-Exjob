import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { House, UsersThree } from "@phosphor-icons/react";
import { removeAccommodationFromDb } from "./RemoveAccommodationFromDb";
import { Hotel } from "../../types/types";

/**
 * Component that fetches and displays saved hotels for a specific folder.
 *
 * This component retrieves hotels from a Firestore collection based on the folder ID
 * and displays them with relevant details such as hotel name, location, guest count, rating, and price.
 * It also allows the user to remove a hotel from the saved list.
 *
 * @param folderId - The ID of the folder where saved hotels are stored.
 */

const GetAccommodationsFromDb = ({ folderId }: { folderId: string }) => {
  const [savedHotels, setSavedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
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

        const hotelsData: any[] = [];
        snapshot.forEach((docSnap) => {
          const subFolderData = docSnap.data();
          const hotel = subFolderData?.data || [];
          hotelsData.push(...hotel);
        });

        setSavedHotels(hotelsData);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [folderId]);

  if (loading) {
    return <div>Loading hotels...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(savedHotels);

  /**
   * Removes a specific hotel from the saved list and Firestore database.
   *
   * This function calls the removeAccommodationFromDb function to remove a specific hotel
   * from Firestore and updates the component's state to reflect the change.
   *
   * @param hotel - The hotel to be removed.
   * @param folderId - The folder ID where the hotel is saved.
   * @param hotelId - The ID of the hotel to be removed.
   */

  const handleRemoveHotel = (
    hotel: Hotel,
    folderId: string,
    hotelId: string | undefined
  ) => {
    if (!hotelId) return;

    removeAccommodationFromDb(hotel, folderId)
      .then(() => {
        setSavedHotels((prevHotels) =>
          prevHotels.filter((savedHotel) => savedHotel.id !== hotel.id)
        );
      })
      .catch((error) => {
        console.error("Error removing hotel from database: ", error);
      });
  };

  return (
    <div className="space-y-2 w-full max-h-[500px] scroll-smooth mt-10 overflow-y-auto no-scrollbar last:mb-5 pb-10">
      {savedHotels.length > 0 ? (
        savedHotels.map((hotel, index) => (
          <div
            className="transition duration-300 hover:shadow-xl w-[40%] max-w-2xl p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
            key={index}
          >
            <div className="grid items-center grid-cols-12 gap-4">
              <div className="col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <House size={24} className="text-black mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold">{hotel.name}</p>
                        <p className="text-xs text-gray-600">
                          {hotel.location}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-center"></p>
                        <p className="text-xs text-gray-600 text-center"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UsersThree size={24} className="text-black mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold">Guests</p>
                        <p className="text-xs text-gray-600">
                          Adults: {hotel.adult} | Children: {hotel.child}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-center">Rating</p>
                        <p className="text-xs text-gray-600 text-center">
                          {hotel.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and Save Button (Centered vertically) */}
              <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
                <p className="text-lg font-bold text-black text-center">
                  €{hotel.total_price}
                </p>
                <button
                  onClick={() => handleRemoveHotel(hotel, folderId, hotel.id)}
                  className="w-full text-center justify-center shadow-md px-4 py-1 text-white border border-slateGray rounded-lg outline-none lg:px-1 font-semibold bg-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center max-w-md mx-auto text-gray-800">
          You haven’t saved any accommodations yet. Why not head over to Search
          and find the perfect place to stay for your next adventure? 🏨🌍
        </p>
      )}
    </div>
  );
};

export default GetAccommodationsFromDb;
