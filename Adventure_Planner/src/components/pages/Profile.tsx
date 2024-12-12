import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { MapPin } from "@phosphor-icons/react"; // Import Phosphor Icon for the marker
import FavIconProfilePic from "../../assets/favicon/favicon.svg";
// Import your map image here
import ProfileMap from "../../assets/profile/profile-map.png"; // Lägg till din bilds sökväg här

const Profile: React.FC = () => {
  const [aboutMe, setAboutMe] = useState<string>("");
  const [adventures, setAdventures] = useState<string[]>([]);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const savedAboutMe = localStorage.getItem(`aboutMe-${user.uid}`);
      const savedMarkers = localStorage.getItem(`markers-${user.uid}`);

      if (savedAboutMe) {
        setAboutMe(savedAboutMe);
      }

      if (savedMarkers) {
        setMarkers(JSON.parse(savedMarkers));
      }

      setAdventures([
        "Adventure 1",
        "Adventure 2",
        "Adventure 3",
        "Adventure 4",
        "Adventure 5",
        "Adventure 6",
        "Adventure 7",
      ]);
    }
  }, [user]);

  const handleAboutMeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(event.target.value);
  };

  const handleBlur = () => {
    if (user) {
      localStorage.setItem(`aboutMe-${user.uid}`, aboutMe);
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const mapContainer = e.currentTarget;
    const rect = mapContainer.getBoundingClientRect();
    const lat = ((e.clientY - rect.top) / mapContainer.offsetHeight) * 100;
    const lng = ((e.clientX - rect.left) / mapContainer.offsetWidth) * 100;

    // Toleransvärde för att avgöra när ett markeringsområde är tillräckligt nära för att tas bort
    const tolerance = 2; 

    // Hitta om det redan finns en markör nära den plats där användaren klickade
    const existingMarkerIndex = markers.findIndex(
      (marker) =>
        Math.abs(marker.lat - lat) < tolerance && Math.abs(marker.lng - lng) < tolerance
    );

    if (existingMarkerIndex !== -1) {
      // Om en marker finns inom toleransområdet, ta bort den
      const updatedMarkers = markers.filter((_, index) => index !== existingMarkerIndex);
      setMarkers(updatedMarkers);
      saveMarkers(updatedMarkers);
    } else {
      // Om ingen marker finns, lägg till en ny
      const updatedMarkers = [...markers, { lat, lng }];
      setMarkers(updatedMarkers);
      saveMarkers(updatedMarkers);
    }
  };

  const saveMarkers = (newMarkers: { lat: number; lng: number }[]) => {
    if (user) {
      localStorage.setItem(`markers-${user.uid}`, JSON.stringify(newMarkers));
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-24 mb-12 mx-12">
      <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
        {/* Left profile box */}
        <div className="flex flex-col items-center p-4 w-full md:w-1/4 bg-white border-2 border-slate-500 rounded-lg shadow-xl">
          <img
            className="border-2 border-white rounded-full w-24 h-24 p-4 flex justify-center items-center ring-slateGray ring-2 bg-cloudGray"
            src={user.photoURL || FavIconProfilePic}
            alt="Profile Picture"
          />
          <h3 className="text-gray-800 text-xl font-medium mb-2 mt-4">
            {user.displayName || "Adventurer"}
          </h3>
          <p className="text-gray-600 text-sm">{user.email}</p>

          {/* About Me Section */}
          <div className="mt-4 w-full">
            <h4 className="text-gray-800 text-md font-medium mt-10 mb-2">
              What's your story?
            </h4>
            <textarea
              value={aboutMe}
              onChange={handleAboutMeChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself..."
              className="w-full h-28 p-3 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 resize-none"
            />
          </div>
        </div>

        {/* Right profile box with Adventures and map */}
        <div className="flex flex-col p-4 w-full md:w-3/4 bg-white border-2 border-slate-500 rounded-lg shadow-xl">
          <h2 className="text-gray-800 text-xl font-semibold mb-2">
            Welcome, {user.displayName || "Adventurer"}!
          </h2>
          <p className="text-gray-500 text-sm">
            Update your settings, get an overview of your adventures, share your story, and click on the map to mark the places you've visited!
          </p>

          <div className="mt-4 flex flex-row gap-4 h-full">
            {/* Adventures section */}
            <div className="flex flex-col w-1/3 gap-4 overflow-auto">
              <div className="bg-gradient-to-r to-orange-50 from-orange-200 p-3 border-2 border-slate-600 rounded-lg">
                <h4 className="text-gray-800 text-md font-medium">Adventures ({adventures.length})</h4>
              </div>
              <div className="bg-gradient-to-r to-orange-50 from-orange-200 flex flex-col gap-2 overflow-y-auto max-h-[283px] border-2 border-slate-600 rounded-lg p-2">
                {adventures.map((adventure, index) => (
                  <div
                    key={index}
                    className="p-3 border border-slate-400 rounded-lg bg-white shadow-sm transition duration-300 hover:shadow-md"
                  >
                    {adventure}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div
              id="map"
              className="cursor-pointer flex-grow h-[350px] border-2 border-slate-600 rounded-lg relative"
              onClick={handleMapClick}
              style={{
                backgroundImage: `url(${ProfileMap})`, // Use the imported image here
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", // Add subtle shadow to map
              }}
            >
              {markers.map((marker, index) => (
                <MapPin
                  key={index}
                  size={24}
                  color="#FEBF77" // Using darker teal for better contrast
                  weight="fill"
                  style={{
                    position: "absolute",
                    top: `${marker.lat}%`,
                    left: `${marker.lng}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                />
              ))}
            </div>
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
