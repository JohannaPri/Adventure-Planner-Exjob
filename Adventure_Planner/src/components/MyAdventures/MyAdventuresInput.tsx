import React, { useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { Input } from "../Input";
import { Folder } from "./types";
import { createFolder } from "./Folder/CreateFolder";
import { serverTimestamp } from "firebase/firestore";

interface MyAdventuresInputProps {
  userId: string;
  onAddFolder: (folder: Folder) => void;
}

const MyAdventuresInput: React.FC<MyAdventuresInputProps> = ({ userId, onAddFolder }) => {
  const [folderTitle, setFolderTitle] = useState("");
  const [folderDestination, setFolderDestination] = useState("");

  const handleAddFolder = async () => {
    if (!folderTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    const newFolder: Folder = {
      title: folderTitle,
      description: folderDestination,
      creationDate: new Date().toISOString().split("T")[0],
      createdAt: serverTimestamp(),
    };

    try {
      const folderId = await createFolder(userId, newFolder);
      onAddFolder({ ...newFolder, id: folderId });
      
      setFolderTitle("");
      setFolderDestination("");
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
<div className="justify-center bg-gradient-to-r to-orange-50 from-orange-200 mb-10 mt-32 w-full h-auto lg:h-[100px] sm:h-auto shadow-md flex flex-col md:flex-row max-w-[952px] items-center border border-gray-200 rounded-md p-4">
  <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col gap-6 justify-center items-center">
    <Input
      containerClass="rounded-lg outline-none pl-2 w-full h-[42px] focus:outline-none text-slateGray cursor-pointer"
      id="folderTitle"
      value={folderTitle}
      onChange={(e) => setFolderTitle(e.target.value)}
      placeholder="Adventure Title"
      inputClass="border rounded-lg px-3 py-2 w-full md:w-64"
    />
    <Input
      containerClass="rounded-lg outline-none pl-2 w-full h-[42px] focus:outline-none text-slateGray cursor-pointer"
      id="folderDestination"
      value={folderDestination}
      onChange={(e) => setFolderDestination(e.target.value)}
      placeholder="Destination (optional)"
      inputClass="border rounded-lg px-3 py-2 w-full md:w-64"
    />
    <button
      onClick={handleAddFolder}
      className="hover:shadow shadow-black text-gray-600 hover:text-gray-800 justify-center border h-[40px] lg:min-w-[120px] md:min-w-[90px] sm:w-[120px] w-[120px] pl-4 pr-4 rounded-md border-slateGray text-sm flex items-center space-x-2 cursor-pointer"
    >
      <PlusCircle size={32} weight="fill" />
    </button>
  </div>
</div>
  );
};

export default MyAdventuresInput;