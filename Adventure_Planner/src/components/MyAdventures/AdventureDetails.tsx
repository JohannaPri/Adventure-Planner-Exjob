import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
import {
  doc,
  getDoc,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import FolderComponent from "./FolderComponent";
import { getAuth } from "firebase/auth";

interface Folder {
  userId: string;
  id: string;
  title: string;
  description: string;
  folderTitle: string;
  folderDestination: string;
  creationDate: string;
}

const AdventureDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [folder, setFolder] = useState<Folder | null>(null);
  const [subfolders, setSubfolders] = useState<Folder[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

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
        console.log("Fetching document from path:", folderDocRef.path);

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
        const subfolderCollection = collection(
          db,
          "users",
          user.uid,
          "userFolders",
          id,
          "subfolders"
        );
        console.log(
          "Fetching subfolders from collection path:",
          subfolderCollection.path
        );

        const snapshot = await getDocs(subfolderCollection);

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

      const folderDocRef = doc(db, "users", user.uid, "userFolders", folderId);
      await deleteDoc(folderDocRef);
      console.log("Folder deleted successfully");
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  if (!id) {
    return <div>Error: No adventure ID provided in the URL.</div>;
  }

  if (!folder) {
    return <div>Loading folder details...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-28">
      <h1 className="text-2xl font-bold">{folder.title}</h1>
      <p className="text-gray-500">
        {folder.description || "No destination specified"}
      </p>
      <div className="p-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-[500px] overflow-x-scroll scroll-smooth no-scrollbar">
        {subfolders.map((subfolder) => (
          <FolderComponent
            key={subfolder.id}
            {...subfolder}
            onDeleteFolder={() => handleDeleteFolder(subfolder.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdventureDetails;
