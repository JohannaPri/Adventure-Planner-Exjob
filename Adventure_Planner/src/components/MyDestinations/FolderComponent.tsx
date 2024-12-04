import React, { useState } from 'react';
import {
  Folder,
  XCircle,
} from "@phosphor-icons/react";
import './folder.css';

interface FolderProps {
  id: number;
  folderTitle: string;
  folderDestination?: string;
  creationDate: string;
  onDeleteFolder: (id: number) => void;
}

const FolderComponent: React.FC<FolderProps> = ({ 
  id,
  folderTitle,
  folderDestination,
  creationDate,
  onDeleteFolder,
 }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center flex-col m-6">
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} id="folder" className="bg-white w-[190px] max-h-[190px] max-w-[190px] h-[190px] relative mb-40 flex flex-col items-center justify-center p-4 rounded-lg shadow-md">
        <button onClick={() => onDeleteFolder(id)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <XCircle size={24} weight="fill" />
        </button>

        <div className="absolute top-3 flex items-center justify-center mb-3">
          <Folder size={120} color="#3C3F4E" />
        </div>
        <div className="folder-text text-center">
          <p className="absolute w-full bottom-10 left-0 text-center text-lg font-semibold text-gray-800">
            {folderTitle && folderTitle.length > 13 ? folderTitle.slice(0, 13) + "..." : folderTitle}
          </p>
          <p className="absolute w-full bottom-5 left-0 text-center text-sm text-gray-500">
            { isHovered ? creationDate : folderDestination && folderDestination.length ? folderDestination.length > 15 ? folderDestination.slice(0, 15) + "..." : folderDestination : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FolderComponent;
