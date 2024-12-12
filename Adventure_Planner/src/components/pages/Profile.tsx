import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { MapPin } from "@phosphor-icons/react"; // Import Phosphor Icon for the marker
import favIconProfilePic from "../../assets/favicon/favicon.svg";

const Profile: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [aboutMe, setAboutMe] = useState<string>(""); // State for 'About Me' text
  const [adventures, setAdventures] = useState<string[]>([]); // Placeholder for adventures list
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]); // State for marker positions

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserId(userId);

      // Get "About Me" from localStorage when the user logs in
      const savedAboutMe = localStorage.getItem(`aboutMe-${user.uid}`);
      if (savedAboutMe) {
        setAboutMe(savedAboutMe); // Set the text if saved in localStorage
      }

      // Example adventure data (replace with actual data later)
      setAdventures(["Adventure 1", "Adventure 2", "Adventure 3"]);
    }
  }, [user]);

  const handleAboutMeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(event.target.value);
  };

  const handleBlur = () => {
    if (user) {
      // Save "About Me" in localStorage when the user clicks out of the box
      localStorage.setItem(`aboutMe-${user.uid}`, aboutMe);
    }
  };

  // Handle click on the map to add a marker
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const mapContainer = e.currentTarget;
    const rect = mapContainer.getBoundingClientRect();
    const lat = ((e.clientY - rect.top) / mapContainer.offsetHeight) * 100; // Calculate relative latitude
    const lng = ((e.clientX - rect.left) / mapContainer.offsetWidth) * 100; // Calculate relative longitude

    setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-24 mb-12 mx-12">
      <div className="flex flex-col md:flex-row justify-between gap-6 p-4">
        {/* Left profile box with smaller shadow */}
        <div className="flex flex-col items-center p-6 w-full md:w-1/4 bg-white border-2 border-slate-500 rounded-lg shadow-xl h-[450px]">
          <img
            className="border-2 border-white rounded-full w-28 h-28 p-4 flex justify-center items-center ring-slateGray ring-2 bg-cloudGray"
            src={user.photoURL || favIconProfilePic}
            alt="Profile Picture"
          />
          <h3 className="text-gray-800 text-xl font-medium mb-2 mt-6">
            {user.displayName || "Adventurer"}
          </h3>
          <p className="text-gray-600 text-sm">{user.email}</p>

          {/* About Me - Textarea */}
          <div className="mt-4 w-full">
            <h4 className="text-gray-800 text-md font-medium mt-8 mb-2">
              What's your story?
            </h4>
            <textarea
              value={aboutMe}
              onChange={handleAboutMeChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself..."
              className="w-full h-24 p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 resize-none"
            />
          </div>
        </div>

        {/* Right profile box with Adventures section and map */}
        <div className="flex flex-col p-6 w-full md:w-3/4 bg-white border-2 border-slate-500 rounded-lg shadow-xl h-[450px]">
          <h2 className="text-gray-800 text-xl font-semibold mb-4">
            Welcome, {user.displayName || "Adventurer"}!
          </h2>
          <p className="text-gray-500 text-sm">
            Here you can manage your account settings, view your activities, and more!
          </p>

          {/* Adventures heading with count on the same row */}
          <div className="mt-6 flex items-center border border-slate-600 rounded-lg p-2 w-1/5">
            <h4 className="text-gray-800 text-md font-medium mr-2">Adventures:</h4>
            <span className="text-gray-600 text-sm">{adventures.length}</span>
          </div>

          {/* List of all adventures with a larger container */}
          <div className="mt-4 w-1/5 border border-slate-600 rounded-lg p-2 h-32 overflow-auto">
            <ul className="space-y-1 list-none pl-0">
              {adventures.map((adventure, index) => (
                <li key={index} className="text-gray-600 text-sm">
                  {adventure}
                </li>
              ))}
            </ul>
          </div>

          {/* Static Map with Phosphor marker */}
          <div
            id="map"
            className="w-full h-[300px] mt-4 border-2 border-slate-600 rounded-lg relative"
            onClick={handleMapClick} // Add marker on click
            style={{
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/4/46/Blank_map_of_the_world_with_latitudes_and_longitudes.svg")',
              backgroundSize: "cover",
            }}
          >
            {markers.map((marker, index) => (
              <MapPin
                key={index}
                size={32} // Set size for the marker
                color="#FF0000" // Marker color
                weight="regular" // Border width for the marker
                style={{
                  position: "absolute",
                  top: `${marker.lat}%`,
                  left: `${marker.lng}%`,
                  transform: "translate(-50%, -100%)", // Adjust position for centering the marker
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;






















































/* import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  if (!user) {
    throw new Error("No user is logged in");
  }

  if (!user) {
    return <p>Loading...</p>;
  }  

  return (
    <div className="profile-container mt-24 p-4">
      <h2 className="text-center text-2xl font-medium">
        <div className="flex flex-col justify-center items-center border border-slateGray rounded-md p-4 h-[400px] w-[300px]">
          <img className="border-2 border-white rounded-full w-16 h-16 p-4 flex justify-center items-center ring-slateGray ring-2 bg-cloudGray" src={currentUser?.photoURL || ""} alt="PP" />
          userid
          email
          shoe size
        </div>
        Welcome, {user.displayName ? user.displayName : "Adventurer"}!
      </h2>
      <p className="text-gray-200">Email: {user.email}</p>
      <p className="text-gray-200">UID: {user.uid}</p>
    </div>
  );
};

export default Profile; */
