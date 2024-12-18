import React, { ReactNode, useState } from "react";
import { Folder, Warning, XCircle } from "@phosphor-icons/react";
import { deleteFolder } from "./DeleteFolder";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../folder.css";
import { DeleteModalComponent } from "../../DeleteModalComponent";

interface FolderProps {
  id?: string;
  folderTitle: string;
  folderDestination?: string;
  creationDate: string;
  onDeleteFolder: (id: string) => void;
}

const FolderComponent: React.FC<FolderProps> = ({
  id,
  folderTitle,
  folderDestination,
  creationDate,
  onDeleteFolder,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string | ReactNode;
    confirmText: string;
    closeText: string;
  } | null>(null);

  const navigate = useNavigate();

  /**
   * Handles the folder deletion process by authenticating the user
   * and calling the deleteFolder function to remove the folder.
   *
   * @param folderId - The ID of the folder to delete.
   */

  const handleDeleteFolder = async (folderId: string) => {
    console.log("FOLDER ID: ", id);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        console.log("Folder Id to delete: ", id);
        await deleteFolder(userId, folderId);
        console.log(`Folder with ID ${folderId} deleted.`);
        onDeleteFolder(folderId);
        setIsModalOpen(false);
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Failed to delete folder: ", error);
    }
  };

  /**
   * Opens the modal to confirm folder deletion.
   * Sets the content for the modal with a warning message and options.
   */

  const openModal = () => {
    setModalContent({
      title: "Hold on! You're about to delete this folder...",
      description: (
        <>
          Are you sure you want to delete <strong>{folderTitle}?</strong> Once
          it's gone, you can't get it back!
        </>
      ),
      confirmText: "Yes, Delete!",
      closeText: "No, Cancel",
    });
    setIsModalOpen(true);
  };

  const handleClick = () => {
    console.log("CLICK!", id);
    navigate(`/my-adventures/${id}`);
  };

  const truncateText = (text: string, length: number = 15) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div className="flex flex-col items-center justify-center m-6">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        id="folder"
        className="bg-white w-[190px] max-h-[190px] max-w-[190px] h-[190px] relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md"
      >
        <button
          onClick={openModal}
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
        >
          <XCircle size={24} weight="fill" />
        </button>

        <div
          onClick={handleClick}
          className="absolute flex items-center justify-center mb-3 cursor-pointer top-3"
        >
          <Folder size={120} color="#3C3F4E" />
        </div>

        <div className="text-center folder-text">
          <p className="absolute left-0 w-full text-lg font-semibold text-center text-gray-800 bottom-10">
            {truncateText(folderTitle, 13)}
          </p>
          <p className="absolute left-0 w-full text-sm text-center text-gray-500 bottom-5">
            {isHovered
              ? truncateText(creationDate)
              : folderDestination && folderDestination.length > 0
              ? truncateText(folderDestination)
              : ""}
          </p>
        </div>
      </div>
      {isModalOpen && modalContent && (
        <DeleteModalComponent
          title={modalContent.title}
          description={modalContent.description}
          confirmText={modalContent.confirmText}
          closeText={modalContent.closeText}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDeleteFolder(id || "")}
          icon={<Warning size={60} />}
        />
      )}
    </div>
  );
};

export default FolderComponent;
