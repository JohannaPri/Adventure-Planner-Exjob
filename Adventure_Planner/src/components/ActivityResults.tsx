import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Mountains, UsersThree } from "@phosphor-icons/react";
import StarRating from "./StarRating";
import { getAuth } from "firebase/auth";
import { fetchFolders } from "./MyAdventures/Folder/FetchFolders";
import { Activity } from "./types/types";
import { removeActivityFromDb } from "./MyAdventures/SavedData/RemoveActivityFromDb";
import { saveActivityToDb } from "./MyAdventures/SavedData/SaveActivityToDb";
import checkIfActivityExists from "./MyAdventures/SavedData/CheckActivityExists";

const ActivityResult: React.FC = () => {
  const [activityExists, setActivityExists] = useState<{
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

  // Fetch folders for the authenticated user
  useEffect(() => {
    const fetchAndSetFolders = async () => {
      if (userId) {
        const fetchedFolders = await fetchFolders(userId);
        setFolders(fetchedFolders);
      }
    };
    fetchAndSetFolders();
  }, [userId]);

  // Fetch activity data from Redux store
  const {
    data: activityData,
    status,
    error,
  } = useSelector((state: RootState) => state.activity);

  useEffect(() => {
    if (selectedFolderId) {
      const checkAllActivitysExist = async () => {
        const existsObj: { [id: string]: boolean } = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        for (const activity of hotelData) {
          const exists = await checkIfActivityExists(
            activity,
            selectedFolderId
          );
          existsObj[activity.id] = exists;
        }
        setActivityExists(existsObj);
      };
      checkAllActivitysExist();
    }
  }, [selectedFolderId, activityData]);

  /**
   * Handles the saving or removal of an activity.
   * If the activity does not exist in the selected folder, it saves it;
   * if it exists, it removes it from the folder.
   *
   * @param userId The ID of the authenticated user.
   * @param activity The activity object to be saved or removed.
   * @param selectedFolderId The ID of the selected folder to which the activity is associated.
   */

  const handleSaveActivity = async (
    userId: string,
    activity: Activity,
    selectedFolderId: string
  ) => {
    if (userId && activity && selectedFolderId) {
      try {
        const exists = activityExists[activity.id];
        if (!exists) {
          await saveActivityToDb(activity, selectedFolderId);
        } else {
          await removeActivityFromDb(activity, selectedFolderId);
        }
        setActivityExists((prevState) => ({
          ...prevState,
          [activity.id]: !exists,
        }));
      } catch (error) {
        console.error("Error saving or removing activity: ", error);
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
          Hold on, we’re almost there! 🎟️🎢
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          We’re busy finding the most exciting activities so you can make the
          most of your trip. A little patience and your adventure will be ready
          to roll!
        </p>
      </div>
    );
  if (status === "failed") return <div>Error: {error}</div>;

  const hasSearched = status === "succeeded";

  if (hasSearched && (!activityData || activityData.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
        <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
          Uh-oh, no activities found! 🎭🤷
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Looks like all the fun is hiding somewhere. Try tweaking your search
          settings—your next great adventure might just be a refresh away!
        </p>
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="space-y-2 w-full max-h-[500px] scroll-smooth mt-20 overflow-y-auto no-scrollbar last:mb-5 pb-10"
    >
      {activityData && activityData.length > 0 && (
        <div className="relative transition duration-300 lg:w-[40%] w-screen text-sm lg:text-base sm:text-sm sm:w-screen max-w-2xl lg:p-6 p-4 sm:p-4 mx-auto text-black bg-gray-100 border-2 border-white shadow-md shadow-gray-200 rounded-lg mb-6">
          <div className="mb-4">
            <p className="text-base font-semibold mb-2 text-gray-800">
              Select Your Adventure Folder.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Choose the folder where you'd like to save your activity details.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Simply pick your Adventure folder and hit Save to store your
              activities!
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
      {activityData &&
        activityData?.map((activity, index) => (
          <div
            className="transition duration-300 hover:shadow-xl lg:w-[40%] w-screen text-sm lg:text-base sm:text-sm sm:w-screen max-w-2xl lg:p-6 p-4 sm:p-4  mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
            key={index}
          >
            <div className="grid items-center grid-cols-12 gap-4">
              <div className="col-span-8 space-y-2">
                <div className="flex items-center gap-2">
                  <Mountains size={24} className="text-black mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold">{activity.type}</p>
                        <p className="text-xs text-gray-600">
                          {activity.category} ({activity.durationHours} hours) -{" "}
                          {activity.city}
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
                        <p className="text-sm font-bold">Participants</p>
                        <p className="text-xs text-gray-600">
                          Adults: {activity.adults} | Children:{" "}
                          {activity.children}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-center">Rating</p>
                        <p className="text-xs text-gray-600 text-center">
                          <StarRating
                            value={activity.rating}
                            maxStars={5}
                            size={16}
                            color="yellow-500"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
                <p className="text-lg font-bold text-black text-center">
                  €{activity.price}
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
                        handleSaveActivity(userId, activity, selectedFolderId);
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
                    {activityExists[activity.id] ? "Remove" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ActivityResult;
