import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { Mountains, UsersThree } from "@phosphor-icons/react";
import { Activity } from "../../types/types";
import { removeActivityFromDb } from "./RemoveActivityFromDb";
import StarRating from "../../StarRating";

/**
 * Component that fetches and displays saved activities for a specific folder.
 *
 * This component retrieves saved activities from Firestore for a given folder ID,
 * displaying details such as activity type, category, participants, rating, and price.
 * Users can also remove activities from their saved list.
 *
 * @param folderId - The ID of the folder where saved activities are stored.
 */

const GetActivitiesFromDb = ({ folderId }: { folderId: string }) => {
  const [savedActivities, setSavedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
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
        const q = query(subFoldersRef, where("itemId", "==", 3));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          throw new Error("No document found with itemId = 3");
        }

        const activitiesData: any[] = [];
        snapshot.forEach((docSnap) => {
          const subFolderData = docSnap.data();
          const activity = subFolderData?.data || [];
          activitiesData.push(...activity);
        });

        setSavedActivities(activitiesData);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [folderId]);

  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(savedActivities);

  /**
   * Removes a specific activity from the saved list and Firestore database.
   *
   * This function calls the removeActivityFromDb function to remove an activity
   * from Firestore and updates the component's state to reflect the change.
   *
   * @param activity - The activity to be removed.
   * @param folderId - The folder ID where the activity is saved.
   * @param activityId - The ID of the activity to be removed.
   */

  const handleRemoveActivity = (
    activity: Activity,
    folderId: string,
    activityId: string | undefined
  ) => {
    if (!activityId) return;

    removeActivityFromDb(activity, folderId)
      .then(() => {
        setSavedActivities((prevActivities) =>
          prevActivities.filter(
            (savedActivity) => savedActivity.id !== activity.id
          )
        );
      })
      .catch((error) => {
        console.error("Error removing activity from database: ", error);
      });
  };

  return (
    <div className="space-y-2 w-full max-h-[500px] scroll-smooth mt-10 overflow-y-auto no-scrollbar last:mb-5 pb-10">
      {savedActivities.length > 0 ? (
        savedActivities.map((activity, index) => (
          <div
            className="transition duration-300 hover:shadow-xl lg:w-[40%] w-screen text-sm lg:text-base sm:text-sm sm:w-screen max-w-2xl lg:p-6 p-4 sm:p-4 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
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

              {/* Price and Save Button (Centered vertically) */}
              <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
                <p className="text-lg font-bold text-black text-center">
                  €{activity.price}
                </p>
                <button
                  onClick={() =>
                    handleRemoveActivity(activity, folderId, activity.id)
                  }
                  className="lg:w-full w-fit sm:w-fit text-center justify-center shadow-md px-4 py-1 text-white border border-slateGray rounded-lg outline-none lg:px-1 font-semibold bg-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center max-w-md mx-auto text-gray-800">
          You haven’t saved any activities yet. Why not head over to Search and
          find exciting things to do for your next adventure? 🌍🎉
        </p>
      )}
    </div>
  );
};

export default GetActivitiesFromDb;
