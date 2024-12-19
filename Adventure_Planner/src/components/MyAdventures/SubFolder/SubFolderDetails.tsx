import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import WanderListDetails from "../Wanderlist/WanderListDetails";
import GetFlightsFromDb from "../SavedData/GetFlightsFromDb";
import GetAccommodationsFromDb from "../SavedData/GetAccommodationsFromDb";
import GetActivitiesFromDb from "../SavedData/GetActivitiesFromDb";
import GetNewSubFolder from "../SavedData/GetNewSubFolder";
import { ArrowCircleLeft } from "@phosphor-icons/react";

interface SubFolder {
  id: string;
  title: string;
  description?: string;
  creationDate: string;
  priority: number;
  typeId: number;
  title2: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Component to display details of a specific subfolder.
 * Fetches the subfolder details from Firestore based on the provided parent folder ID and subfolder ID.
 * The content rendered depends on the type of subfolder (typeId).
 */

const SubFolderDetails: React.FC = () => {
  const { parentFolderId, subFolderId } = useParams<{
    parentFolderId: string;
    subFolderId: string;
  }>();
  console.log("Extracted parentFolderId:", parentFolderId);
  console.log("Extracted subFolderId:", subFolderId);

  const [subFolder, setSubFolder] = useState<SubFolder | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!user || !parentFolderId || !subFolderId) return;

    const fetchSubFolderDetails = async () => {
      try {
        const subFolderDocRef = doc(
          db,
          "users",
          user.uid,
          "userFolders",
          parentFolderId,
          "subFolders",
          subFolderId
        );
        const subFolderSnap = await getDoc(subFolderDocRef);

        if (subFolderSnap.exists()) {
          setSubFolder({
            id: subFolderSnap.id,
            ...subFolderSnap.data(),
          } as SubFolder);
        } else {
          console.error("Subfolder not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching subfolder details:", error);
      }
    };

    fetchSubFolderDetails();
  }, [parentFolderId, subFolderId, user]);

  if (!parentFolderId || !subFolderId) {
    return <div>Error: No folder or subfolder ID provided in the URL.</div>;
  }

  if (!subFolder) {
    return <div>Loading subfolder details...</div>;
  }

  return (
    <div>
      <div className="flex flex-col pb-20">
        {(() => {
          switch (subFolder.typeId) {
            case 1:
              return (
                <div className="flex flex-col items-center mt-28">
                  <div className="flex w-full justify-between items-center">
                    <div className="absolute left-0 lg:ml-96 ml-80 sm:ml-80 pt-1 md:ml-20">
                      <button onClick={handleBackClick}>
                        <ArrowCircleLeft
                          className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer"
                          weight="fill"
                          size={32}
                        />
                      </button>
                    </div>
                    <h1 className="text-2xl font-bold text-center w-full">
                      Saved Flights
                    </h1>
                  </div>
                  {/* Component to display flights from the database */}
                  <GetFlightsFromDb folderId={parentFolderId} />
                </div>
              );
            case 2:
              return (
                <div className="flex flex-col items-center mt-28">
                  <div className="flex w-full justify-between items-center">
                    <div className="absolute lg:left-0 right-3 lg:ml-96 ml-80 sm:ml-80 pt-1 sm:right-3 md:left-3 md:ml-20">
                      <button onClick={handleBackClick}>
                        <ArrowCircleLeft
                          className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer"
                          weight="fill"
                          size={32}
                        />
                      </button>
                    </div>
                    <h1 className="text-2xl font-bold text-center w-full">
                      Saved Accommodations
                    </h1>
                  </div>
                  {/* Component to display accommodations from the database */}
                  <GetAccommodationsFromDb folderId={parentFolderId} />
                </div>
              );
            case 3:
              return (
                <div className="flex flex-col items-center mt-28">
                  <div className="flex w-full justify-between items-center">
                    <div className="absolute left-0 lg:ml-96 ml-80 sm:ml-80 pt-1 md:left-3 md:ml-20">
                      <button onClick={handleBackClick}>
                        <ArrowCircleLeft
                          className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer"
                          weight="fill"
                          size={32}
                        />
                      </button>
                    </div>
                    <h1 className="text-2xl font-bold text-center w-full">
                      Saved Activities
                    </h1>
                  </div>
                  {/* Component to display activities from the database */}
                  <GetActivitiesFromDb folderId={parentFolderId} />
                </div>
              );
            case 4:
              return (
                <div className="flex flex-col items-center justify-center">
                  {/* Component to display wanderlist details */}
                  <WanderListDetails
                    userId={user?.uid || ""}
                    parentFolderId={parentFolderId}
                    title={
                      subFolder.typeId === 4
                        ? subFolder.title2
                        : subFolder.title
                    }
                    title2={subFolder.title2}
                  />
                </div>
              );
            case 5:
              return (
                <div className="flex flex-col items-center mt-28">
                  {/* Component to display a new subfolder */}
                  <GetNewSubFolder
                    userId={user?.uid || ""}
                    parentFolderId={parentFolderId}
                    subFolderId={subFolderId}
                  />
                </div>
              );
            default:
              return (
                <div className="p-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[500px] overflow-x-scroll scroll-smooth no-scrollbar">
                  <h2 className="text-xl font-semibold">Unknown Folder Type</h2>
                  <p>This folder does not have a recognized type.</p>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default SubFolderDetails;
