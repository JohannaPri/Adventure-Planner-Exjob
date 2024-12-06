import React, { useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { Input } from "../Input";
import { Folder } from "./types";
import { createFolder } from "./CreateFolder";

interface MyAdventuresInputProps {
  userId: string;
  onAddFolder: (folder: Folder) => void;
}

const MyAdventuresInput: React.FC<MyAdventuresInputProps> = ({
  userId,
  onAddFolder,
}) => {
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
    <>
      <div className="justify-center bg-gradient-to-r to-orange-50 from-orange-200 mb-10 mt-28 shadow-md h-[100px] flex-row flex w-[952px] items-center border border-gray-200 rounded-md">
        <div className="ml-6 flex flex-row gap-6">
          <Input
            id="folderTitle"
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            containerClass="relative"
            inputClass="border border-slateGray rounded-lg outline-none pl-2 lg:w-[250px] w-full h-[40px] focus:outline-none text-slateGray py-1 cursor-pointer"
            type="text"
            placeholder="Adventure Title"
          ></Input>
          <Input
            id="folderDestination"
            value={folderDestination}
            onChange={(e) => setFolderDestination(e.target.value)}
            containerClass="relative"
            inputClass="border border-slateGray rounded-lg outline-none pl-2 lg:w-[250px] w-full h-[40px] focus:outline-none text-slateGray py-1 cursor-pointer"
            type="text"
            placeholder="Destination (optional)"
          ></Input>
          <button
            onClick={handleAddFolder}
            className="hover:shadow shadow-black text-gray-600 hover:text-gray-800 justify-center border h-[40px] w-[120px] pl-4 pr-4 rounded-md border-slateGray text-sm flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle size={32} weight="fill" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAdventuresInput;
