import React, { ReactNode, useState } from "react";
import { Folder, Warning, XCircle } from "@phosphor-icons/react";
import { deleteSubFolder } from "./DeleteSubFolder";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { DeleteModalComponent } from "../../DeleteModalComponent";

interface SubFolderProps {
  id?: string;
  title: string;
  creationDate: string;
  parentFolderId: string;
  onDeleteSubfolder: (id: string) => void;
}

/**
 * SubFolderComponent renders a subfolder with options to navigate to it or delete it.
 * It displays the subfolder title and an icon representing the folder.
 *
 * @param id - The ID of the subfolder.
 * @param title - The title of the subfolder.
 * @param parentFolderId - The ID of the parent folder containing this subfolder.
 * @param onDeleteSubfolder - Callback function triggered when a subfolder is deleted.
 */

const SubFolderComponent: React.FC<SubFolderProps> = ({
  id,
  title,
  parentFolderId,
  onDeleteSubfolder,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string | ReactNode;
    confirmText: string;
    closeText: string;
  } | null>(null);

  /**
   * Handles the deletion of a subfolder by calling the deleteSubFolder function
   * and updating the parent component with the onDeleteSubfolder callback.
   *
   * @param subfolderId - The ID of the subfolder to be deleted.
   */

  const handleDeleteSubfolder = async (subfolderId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await deleteSubFolder(user.uid, parentFolderId, subfolderId);
        onDeleteSubfolder(subfolderId);
        setIsModalOpen(false);
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Failed to delete subfolder: ", error);
    }
  };

  const openModal = () => {
    setModalContent({
      title: "Hold on! You're about to delete this folder...",
      description: (
        <>
          Are you sure you want to delete <strong>{title}?</strong> Once it's
          gone, you can't get it back!
        </>
      ),
      confirmText: "Yes, Delete!",
      closeText: "No, Cancel",
    });
    setIsModalOpen(true);
  };

  const handleClick = () => {
    navigate(`/my-adventures/${parentFolderId}/subfolder/${id}`);
  };

  /**
   * Truncates text if it exceeds the specified length, appending '...' at the end.
   *
   * @param text - The text to truncate.
   * @param length - The maximum length before truncation.
   * @returns The truncated text.
   */

  const truncateText = (text: string, length: number = 15) => {
    return text?.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div className="flex flex-col items-center justify-center m-6">
      <div
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
            {truncateText(title, 15)}
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
          onConfirm={() => handleDeleteSubfolder(id || "")}
          icon={<Warning size={60} />}
        />
      )}
    </div>
  );
};

export default SubFolderComponent;
