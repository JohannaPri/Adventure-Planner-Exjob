import React, { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { Input } from "../../Input";
import { createSubFolder } from "./CreateSubFolder";
import { fetchSubFolders } from "./FetchSubFolders";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/slices/toastSlice";

interface CreateSubFolderInputProps {
  userId: string;
  parentFolderId: string;
  onAddSubFolder: (subFolder: any) => void;
}

const CreateSubFolderInput: React.FC<CreateSubFolderInputProps> = ({
  userId,
  parentFolderId,
  onAddSubFolder,
}) => {
  const [subFolderTitle, setSubFolderTitle] = useState("");
  const [isWanderlist, setIsWanderlist] = useState(false);
  const [existingSubFolders, setExistingSubFolders] = useState<any[]>([]);

  const dispatch = useDispatch();

  if (!userId) {
    console.error("UserId is null");
    return;
  }

  const fetchExistingSubFolders = useCallback(async () => {
    if (userId && parentFolderId) {
      try {
        const subFolders = await fetchSubFolders(userId, parentFolderId);
        setExistingSubFolders(subFolders);
      } catch (error) {
        console.error("Error fetching subfolders: ", error);
      }
    }
  }, [userId, parentFolderId]);

  useEffect(() => {
      fetchExistingSubFolders();
  }, [fetchExistingSubFolders]);

  const handleAddSubFolder = async () => {
    if (!subFolderTitle.trim()) {
      return;
    }

    const titleExists = existingSubFolders.some(
      (subFolder) => subFolder.title.toLowerCase() === subFolderTitle.toLowerCase()
    );

    const title2Exists = existingSubFolders.some(
      (subFolder) => console.log('Subfolder: ', subFolder)
    );

    if (titleExists || title2Exists) {
      dispatch(showToast({ message: "Title already exist", type: "error" }));
      return;
    }

    const newSubFolder = {
      title: subFolderTitle,
      title2: subFolderTitle,
      priority: 5,
      typeId: isWanderlist ? 4 : 5,
      data: [],
    };

    try {
      const subFolderId = await createSubFolder(
        userId,
        parentFolderId,
        newSubFolder
      );
      onAddSubFolder({ ...newSubFolder, id: subFolderId });

      setSubFolderTitle("");
      setIsWanderlist(false);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  return (
    <div className="justify-center bg-gradient-to-r to-orange-50 from-orange-200 mb-10 mt-32 w-full h-auto lg:h-[100px] sm:h-auto shadow-md flex flex-col md:flex-row max-w-[952px] items-center border border-gray-200 rounded-md p-4">
      <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col gap-6 justify-center items-center">
        <Input
          containerClass="rounded-lg outline-none pl-2 w-full h-[42px] focus:outline-none text-slateGray cursor-pointer"
          id="subFolderTitle"
          value={subFolderTitle}
          onChange={(e) => setSubFolderTitle(e.target.value)}
          placeholder="Subfolder Title"
          inputClass="border rounded-lg px-3 py-2 w-full md:w-64"
        />
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            id="wanderlistCheck"
            checked={isWanderlist}
            onChange={(e) => setIsWanderlist(e.target.checked)}
            className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
            containerClass={""}
            inputClass={""}
          />
          <label
            htmlFor="wanderlistCheck"
            className="text-sm text-gray-600 whitespace-nowrap"
          >
            Create as a Wanderlist
          </label>
        </div>
        <button
          onClick={handleAddSubFolder}
          className="hover:shadow shadow-black text-gray-600 hover:text-gray-800 justify-center border h-[40px] lg:min-w-[120px] md:min-w-[90px] sm:w-[120px] w-[120px] pl-4 pr-4 rounded-md border-slateGray text-sm flex items-center space-x-2 cursor-pointer"
        >
          <PlusCircle size={32} weight="fill" />
        </button>
      </div>
    </div>
    
  );
};

export default CreateSubFolderInput;
