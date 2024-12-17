import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import SubFolderComponent from "./SubFolder/SubFolderComponent";
import { getAuth } from "firebase/auth";
import CreateSubFolderInput from "./SubFolder/CreateSubFolderInput";
import { ArrowCircleLeft } from "@phosphor-icons/react";

import { deleteFolder } from "./Folder/DeleteFolder";

interface Folder {
  userId: string;
  id: string;
  title: string;
  description: string;
  title2: string;
  folderDestination: string;
  creationDate: string;
  priority: number;
}

const AdventureDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [folder, setFolder] = useState<Folder | null>(null);
  const [subfolders, setSubfolders] = useState<Folder[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log("Extracted id from URL:", id);
  }, [id]);

  useEffect(() => {
    const fetchFolder = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }

      if (!user) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const folderDocRef = doc(db, "users", user?.uid, "userFolders", id);
        console.log("Fetching folder document from path:", folderDocRef.path);

        const folderDoc = await getDoc(folderDocRef);

        if (folderDoc.exists()) {
          console.log("Folder document data:", folderDoc.data());
          setFolder({ id: folderDoc.id, ...folderDoc.data() } as Folder);
        } else {
          console.error("Folder not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching folder:", error);
      }
    };

    fetchFolder();
  }, [id, user]);

  useEffect(() => {
    const fetchSubfolders = async () => {
      if (!id || !user) return;

      try {
        const subfolderCollection = collection(db, "users", user.uid, "userFolders", id, "subFolders");
        console.log("Fetching subfolders from collection path:", subfolderCollection.path);

        const snapshot = await getDocs(subfolderCollection);
        console.log("Fetched subfolder snapshot:", snapshot);

        if (!snapshot.empty) {
          const subfolderList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Folder[];

          console.log("Subfolders fetched:", subfolderList);
          setSubfolders(subfolderList);
        } else {
          console.warn("No subfolders found for the given folder");
        }
      } catch (error) {
        console.error("Error fetching subfolders:", error);
      }
    };

    fetchSubfolders();
  }, [id, user]);

  const handleDeleteFolder = async (folderId: string) => {
    try {
      if (!user) {
        console.error("User is not authenticated");
        return;
      }
      await deleteFolder(user.uid, folderId);
      console.log("Folder deleted successfully");
      setSubfolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleAddSubFolder = (newSubFolder: any) => {
    setSubfolders((prevState) => [...prevState, newSubFolder]);
  };

  if (!id) {
    return <div>Error: No adventure ID provided in the URL.</div>;
  }

  if (!folder) {
    return <div>Loading folder details...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <CreateSubFolderInput userId={user?.uid || ""} parentFolderId={folder.id} onAddSubFolder={handleAddSubFolder} />
      <div className="flex w-full justify-between items-center">
      <div className="absolute left-0 ml-72">
                    <button 
                      onClick={handleBackClick}
                    >
                      <ArrowCircleLeft className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer" weight="fill" size={32} />
                    </button>
                  </div>
      <h1 className="text-2xl font-bold w-full text-center">{folder.title}</h1>
      </div>
      <p className="text-gray-500">
        {folder.description || ""}
      </p>
      <div className="p-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[600px] overflow-x-scroll scroll-smooth no-scrollbar h-full">
        {subfolders.length > 0 ? (
          subfolders
            .sort((a, b) => a.priority - b.priority)
            .map((subfolder) => (
              <SubFolderComponent
                title={subfolder.title}
                key={subfolder.id}
                id={subfolder.id}
                creationDate={subfolder.creationDate}
                parentFolderId={id}
                onDeleteSubfolder={() => handleDeleteFolder(subfolder.id)}
              />
            ))
        ) : (
          <div>No subfolders available.</div>
        )}
      </div>
    </div>
  );
};

export default AdventureDetails;