import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Mountains, UsersThree } from "@phosphor-icons/react";
import StarRating from "./StarRating";

const ActivityResult: React.FC = () => {
  const {
    data: activityData,
    status,
    error,
  } = useSelector((state: RootState) => state.activity);

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

  console.log("FLIGHDATA: ", status === "succeeded");
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
    <div className="space-y-2 w-full max-h-[500px] scroll-smooth mt-20 overflow-y-auto no-scrollbar last:mb-5 pb-10">
      {activityData?.map((activity, index) => (
        <div
          className="transition duration-300 hover:shadow-xl w-[40%] max-w-2xl p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg"
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
              <button className="w-full text-center justify-center shadow-md px-4 py-1 text-white border border-slateGray rounded-lg outline-none lg:px-1 font-semibold bg-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black">
                Save
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityResult;
