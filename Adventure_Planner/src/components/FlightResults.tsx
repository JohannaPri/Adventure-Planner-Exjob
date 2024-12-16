import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  formatFlightData,
  FormattedFlightData,
} from "../utils/formattedFlightData";
import { AirplaneTilt } from "@phosphor-icons/react";
import { getAuth } from "firebase/auth";
import { saveFlightToDb } from "./MyAdventures/SavedData/SaveFlightToDb";
import { fetchFolders } from "./MyAdventures/Folder/FetchFolders";
import checkIfFlightExists from "./MyAdventures/SavedData/CheckFlightExists";
import { removeFlightFromDb } from "./MyAdventures/SavedData/RemoveFlightFromDb";

const FlightResults: React.FC = () => {
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [flightExists, setFlightExists] = useState<{ [flight_id: string]: boolean }>({});

  const listRef = useRef<HTMLDivElement | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const fetchAndSetFolders = async () => {
      if (userId) {
        const fetchedFolders = await fetchFolders(userId);
        setFolders(fetchedFolders);
      }
    };
    fetchAndSetFolders();
  }, [userId]);

  const {
    data: flightData,
    status,
    error,
  } = useSelector((state: RootState) => state.flights);
  // @ts-ignore
  const formattedFlightData = flightData ? formatFlightData(flightData) : [];

  useEffect(() => {
    if (selectedFolderId) {
      const checkAllFlightsExist = async () => {
        const existsObj: { [flight_id: string]: boolean } = {};
        for (const flight of formattedFlightData) {
          const exists = await checkIfFlightExists(flight, selectedFolderId);
          existsObj[flight.flight_id] = exists;
        }
        setFlightExists(existsObj);
      };
      checkAllFlightsExist();
    }
  }, [selectedFolderId, formattedFlightData]);

  const handleSaveFlight = async (userId: string, flight: FormattedFlightData, selectedFolderId: string) => {
    if (userId && flight && selectedFolderId) {
      const exists = await checkIfFlightExists(flight, selectedFolderId);
      setFlightExists((prevState) => ({
        ...prevState,
        [flight.flight_id]: exists,
      }));
  
      if (!exists) {
        await saveFlightToDb(flight, selectedFolderId);
      } else {
        await removeFlightFromDb(flight, selectedFolderId);
      }
    }
  };

  const handleScrollListToTop = () => {
    if (listRef.current) {
      console.log("Scroll to top");
      listRef.current.scrollTop = 0;
    } else {
      console.error("listRef is not set");
    }
  }

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
        <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
          Oops, this is taking a bit longer than expected! 🌎✈️
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          There are so many amazing options, and we’re just making sure to bring
          you the best ones. Hang tight—your perfect adventure is almost ready!
        </p>
      </div>
    );
  if (status === "failed") return <div>Error: {error}</div>;

  const hasSearched = status === "succeeded";

  if (
    hasSearched &&
    (!formattedFlightData || formattedFlightData.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
        <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
          Uh-oh, no flights found! ✈️😮
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Looks like all the planes are busy exploring other skies. Try
          adjusting your search—your perfect flight might just be one refresh
          away!
        </p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="space-y-2 w-full max-h-[500px] scroll-smooth mt-20 overflow-y-auto no-scrollbar last:mb-5 pb-10">
      {formattedFlightData.length > 0 && (
        <div id="infoBox" className="relative transition duration-300 w-[40%] max-w-2xl p-6 mx-auto text-black bg-gray-100 border-2 border-white shadow-md shadow-gray-200 rounded-lg mb-6">
          <div className="mb-4">
            <p className="text-base font-semibold mb-2 text-gray-800">
              Select Your Adventure Folder.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Choose the folder where you'd like to save your flight details.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Simply pick your Adventure folder and hit Save to store your
              flights!
            </p>
          </div>
          <div className="justify-end items-center flex space-y-4">
            <div>
              <select
                id="folder-select"
                className="mt-2 p-1 pl-2 border rounded-md"
                onChange={(e) => setSelectedFolderId(e.target.value)}
                value={selectedFolderId || ""}
              >
                <option value="" disabled>
                  Select a folder
                </option>
                {folders?.length ? (
                  folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.title} {folder.description ? `(${folder.description})` : null}
                    </option>
                  ))
                ) : (
                  <option disabled>No folders available</option>
                )}
              </select>
            </div>
          </div>
        </div>
      )}
      {formattedFlightData.map((flight, index) => {
        return (
          <div
            className="transition duration-300 hover:shadow-xl w-[40%] max-w-2xl p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
            key={index}
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
              </div>

              {/* Price and Save Button (Centered vertically) */}
              <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
                <p className="text-lg font-bold text-black text-center">
                  {flight.price}
                </p>
                <div
                  className="w-full"
                  onClick={() => {
                    if (!selectedFolderId && listRef.current) {
                      handleScrollListToTop();
                    }
                  }}
                  >
                <button onClick={() => {
                  if (userId && selectedFolderId) {
                    handleSaveFlight(userId, flight, selectedFolderId);
                  } else {
                    console.error("UserId or selectedFolderId is null or undefined");
                  }
              }}
              className={`w-full text-center justify-center shadow-md px-4 py-1 text-white border rounded-lg outline-none lg:px-1 font-semibold ${
                selectedFolderId 
                ? "bg-slateGray border-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black" 
                : "bg-slateGray border-gray-300 cursor-not-allowed opacity-50"
              }`}>
                {flightExists[flight.flight_id] ? "Remove" : "Save"}
              </button>
              </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightResults;
