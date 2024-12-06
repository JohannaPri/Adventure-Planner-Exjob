import React, { useState, useEffect } from "react";
import MyAdventuresInput from "./MyAdventuresInput";
import FolderComponent from "./FolderComponent";
import { fetchFolders } from "./FetchFolders";
import { Folder } from "./types";
import { getAuth } from "firebase/auth";

const MyAdventures: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    } else {
      console.error("No user is logged in");
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const loadFolders = async () => {
        try {
          setLoading(true);
          const folderList = await fetchFolders(userId);
          setFolders(folderList);
        } catch (error) {
          console.error("Error fetching folders:", error);
        } finally {
          setLoading(false);
        }
      };

      loadFolders();
    }
  }, [userId]);

  const handleAddFolder = (folder: Folder) => {
    setFolders((prev) => [...prev, folder]);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== folderId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <MyAdventuresInput userId={userId!} onAddFolder={handleAddFolder} />
        <h1 className="flex text-left pb-4 font-semibold uppercase">
          My Travel Collections ({folders.length})
        </h1>
        <div className="flex flex-row">
          <div className="p-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[500px] overflow-x-scroll scroll-smooth no-scrollbar">
            {folders.length > 0
              ? folders.map((folder) => {
                  const folderId = folder.id || "";

                  if (folderId === "") {
                    console.warn("Folder has no valid id:", folder);
                    return null;
                  }

                  return (
                    <FolderComponent
                      key={folderId}
                      id={folderId}
                      folderTitle={folder.title}
                      folderDestination={folder.description}
                      creationDate={folder.creationDate}
                      onDeleteFolder={handleDeleteFolder}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAdventures;
