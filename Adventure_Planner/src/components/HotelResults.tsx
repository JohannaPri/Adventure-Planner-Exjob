import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchFolders } from "./MyAdventures/Folder/FetchFolders";
import { House, UsersThree } from "@phosphor-icons/react";
import { getAuth } from "firebase/auth";
import { Hotel } from "./types/types";
import checkIfAccommodationExists from "./MyAdventures/SavedData/CheckAccommodationExists";
import { saveAccommodationToDb } from "./MyAdventures/SavedData/SaveAccommodationToDb";
import { removeAccommodationFromDb } from "./MyAdventures/SavedData/RemoveAccommodationFromDb";

const HotelResults: React.FC = () => {
  const [accommodationExists, setAccommodationExists] = useState<{
    [id: string]: boolean;
  }>({});
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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
    data: hotelData,
    status,
    error,
  } = useSelector((state: RootState) => state.hotel);

  useEffect(() => {
    if (selectedFolderId) {
      const checkAllAccommodationsExist = async () => {
        const existsObj: { [id: string]: boolean } = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        for (const accommodation of hotelData) {
          const exists = await checkIfAccommodationExists(
            accommodation,
            selectedFolderId
          );
          existsObj[accommodation.id] = exists;
        }
        setAccommodationExists(existsObj);
      };
      checkAllAccommodationsExist();
    }
  }, [selectedFolderId, hotelData]);

  const handleSaveAccommodation = async (
    userId: string,
    accommodation: Hotel,
    selectedFolderId: string
  ) => {
    if (userId && accommodation && selectedFolderId) {
      try {
        const exists = accommodationExists[accommodation.id];
        if (!exists) {
          await saveAccommodationToDb(accommodation, selectedFolderId);
        } else {
          await removeAccommodationFromDb(accommodation, selectedFolderId);
        }
        setAccommodationExists((prevState) => ({
          ...prevState,
          [accommodation.id]: !exists,
        }));
      } catch (error) {
        console.error("Error saving or removing accommodation: ", error);
      }
    } else {
      console.error("UserId or selectedFolderId is null or undefined");
    }
  };

  const handleScrollListToTop = () => {
    if (listRef.current) {
      console.log("Scroll to top");
      listRef.current.scrollTop = 0;
    } else {
      console.error("listRef is not set");
    }
  };

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
        <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
          Oops, it’s taking a bit longer than expected! 🏨🛏️
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          We’re checking all the best rooms and fluffing up the pillows to make
          sure you get the comfiest stay. Hang tight—your dream hotel is just a
          moment away!
        </p>
      </div>
    );
  if (status === "failed") return <div>Error: {error}</div>;

  const hasSearched = status === "succeeded";

  if (hasSearched && (!hotelData || hotelData.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
        <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
          Uh-oh, no hotels found! 🛎️😮
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Looks like all the rooms are booked or busy counting sheep. Try
          adjusting your search—you might just find that perfect spot on your
          next click!
        </p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="space-y-2 w-full max-h-[500px] scroll-smooth mt-20 overflow-y-auto no-scrollbar last:mb-5 pb-10"
    >
      {hotelData && hotelData.length > 0 && (
        <div className="relative transition duration-300 lg:w-[40%] w-screen text-sm lg:text-base sm:text-sm sm:w-screen max-w-2xl lg:p-6 p-4 sm:p-4  mx-auto text-black bg-gray-100 border-2 border-white shadow-md shadow-gray-200 rounded-lg mb-6">
          <div className="mb-4">
            <p className="text-base font-semibold mb-2 text-gray-800">
              Select Your Adventure Folder.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Choose the folder where you'd like to save your accommodation
              details.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Simply pick your Adventure folder and hit Save to store your
              accommodations!
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
                      {folder.title}{" "}
                      {folder.description ? `(${folder.description})` : null}
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
      {hotelData &&
        hotelData?.map((hotel, index) => (
          <div
            className="transition duration-300 hover:shadow-xl lg:w-[40%] w-screen text-sm lg:text-base sm:text-sm sm:w-screen max-w-2xl lg:p-6 p-4 sm:p-4  mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
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
                <div
                  className="lg:w-full w-fit sm:w-fit"
                  onClick={() => {
                    if (!selectedFolderId && listRef.current) {
                      handleScrollListToTop();
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      if (userId && selectedFolderId) {
                        handleSaveAccommodation(
                          userId,
                          hotel,
                          selectedFolderId
                        );
                      } else {
                        console.error(
                          "UserId or selectedFolderId is null or undefined"
                        );
                      }
                    }}
                    className={`w-full text-center justify-center shadow-md px-4 py-1 text-white border rounded-lg outline-none lg:px-1 font-semibold ${
                      selectedFolderId
                        ? "bg-slateGray border-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black"
                        : "bg-slateGray border-gray-300 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {accommodationExists[hotel.id] ? "Remove" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HotelResults;
