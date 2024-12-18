import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { AirplaneTilt } from "@phosphor-icons/react";
import { removeFlightFromDb } from "./RemoveFlightFromDb";
import { FormattedFlightData } from "../../../utils/formattedFlightData";

/**
 * Component that fetches and displays saved flights for a specific folder.
 *
 * @param folderId - The ID of the folder to retrieve flights from.
 */

const GetFlightsFromDb = ({ folderId }: { folderId: string }) => {
  const [savedFlights, setSavedFlights] = useState<FormattedFlightData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
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
        const q = query(subFoldersRef, where("itemId", "==", 1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          throw new Error("No document found with itemId = 1");
        }

        const flightsData: any[] = [];
        snapshot.forEach((docSnap) => {
          const subFolderData = docSnap.data();
          const flight = subFolderData?.data || [];
          flightsData.push(...flight);
        });

        setSavedFlights(flightsData);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [folderId]);

  if (loading) {
    return <div>Loading flights...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(savedFlights);

  /**
   * Handles the removal of a flight from Firestore and updates the UI.
   *
   * @param flight - The flight to be removed.
   * @param folderId - The folder ID where the flight is stored.
   * @param flightId - The unique ID of the flight to be removed.
   */

  const handleRemoveFlight = (
    flight: FormattedFlightData,
    folderId: string,
    flightId: string | undefined
  ) => {
    if (!flightId) return;

    removeFlightFromDb(flight, folderId)
      .then(() => {
        setSavedFlights((prevFlights) =>
          prevFlights.filter(
            (savedFlight) => savedFlight.flight_id !== flightId
          )
        );
      })
      .catch((error) => {
        console.error("Error removing flight from database: ", error);
      });
  };

  return (
    <div className="space-y-2 w-full max-h-[500px] scroll-smooth mt-10 overflow-y-auto no-scrollbar last:mb-5 pb-10">
      {savedFlights.length > 0 ? (
        savedFlights.map((flight, index) => (
          <div
            key={index}
            className="transition duration-300 hover:shadow-xl w-[40%] max-w-2xl p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
          >
            <div className="grid items-center grid-cols-12 gap-4">
              {/* Outbound and Return Flights */}
              <div className="col-span-8 space-y-2">
                {/* Outbound Flight */}
                <div className="flex items-center gap-2">
                  <AirplaneTilt size={24} className="text-black mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          {flight.outbound.departure} -{" "}
                          {flight.outbound.arrival}
                        </p>
                        <p className="text-xs text-gray-600">
                          {flight.outbound.carrier}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-center">
                          {flight.outbound.departureTime} –{" "}
                          {flight.outbound.arrivalTime}
                        </p>
                        <p className="text-xs text-gray-600 text-center">
                          {flight.outbound.duration} {flight.outbound.stops}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Flight */}
                {flight.return ? (
                  <div className="flex items-center gap-2">
                    <AirplaneTilt size={24} className="text-black mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-bold">
                            {flight.return.departure} - {flight.return.arrival}
                          </p>
                          <p className="text-xs text-gray-600">
                            {flight.return.carrier}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-center">
                            {flight.return.departureTime} –{" "}
                            {flight.return.arrivalTime}
                          </p>
                          <p className="text-xs text-gray-600 text-center">
                            {flight.return.duration} {flight.return.stops}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No return flight available</p>
                )}
              </div>

              {/* Price and Remove Button (Centered vertically) */}
              <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
                <p className="text-lg font-bold text-black text-center">
                  {flight.price}
                </p>
                <button
                  onClick={() =>
                    handleRemoveFlight(flight, folderId, flight.flight_id)
                  }
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
          You haven’t saved any flights yet. Why not head over to Search and
          find the perfect trip for your next adventure? ✈️🌍
        </p>
      )}
    </div>
  );
};

export default GetFlightsFromDb;
