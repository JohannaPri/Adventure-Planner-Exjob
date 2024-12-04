import React, { useState, useEffect } from "react";
import FolderComponent from "./FolderComponent";
import MyDestinationsInput from "./MyDestinationsInput";

interface Folder {
  id: number;
  folderTitle: string;
  folderDestination?: string;
  creationDate: string;
}

const MyDestinations: React.FC = () => {
  const [savedFolders, setSavedFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const storedFolders = JSON.parse(
      localStorage.getItem("travelcollection") || "[]"
    );
    setSavedFolders(storedFolders);
  }, []);

  const saveToLocalStorage = (folders: Folder[]) => {
    localStorage.setItem("travelcollection", JSON.stringify(folders));
    setSavedFolders(folders);
  };

  const handleDeleteFolder = (id: number) => {
    const updatedFolders = savedFolders.filter((folder) => folder.id !== id);
    setSavedFolders(updatedFolders);
    saveToLocalStorage(updatedFolders);
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <MyDestinationsInput
          onAddFolder={(newFolder: Folder) => {
            const updatedFolders = [...savedFolders, newFolder];
            saveToLocalStorage(updatedFolders);
          }}
        />
        <h1 className="flex text-left pb-4 font-semibold uppercase">
          My Travel Collections ({savedFolders.length})
        </h1>
        <div className="flex flex-row">
          {savedFolders.map((folder) => (
            <FolderComponent
              key={folder.id}
              id={folder.id}
              folderTitle={folder.folderTitle}
              folderDestination={folder.folderDestination}
              creationDate={folder.creationDate}
              onDeleteFolder={handleDeleteFolder}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyDestinations;
