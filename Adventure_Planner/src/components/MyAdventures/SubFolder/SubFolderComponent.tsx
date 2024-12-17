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
    console.log('sdflfdk');
    setModalContent({
      title: "Hold on! You're about to delete this folder...",
      description: (
        <>
          Are you sure you want to delete <strong>{title}?</strong> Once it's gone, you can't get it back!
        </>
      ),
      confirmText: "Yes, Delete!",
      closeText: "No, Cancel",
    });
    setIsModalOpen(true);
  }

  const handleClick = () => {
    navigate(`/my-adventures/${parentFolderId}/subfolder/${id}`);
  };

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
          onConfirm={() => handleDeleteSubfolder(id || '')}
          icon={<Warning size={60} />}
        />
      )}
    </div>
  );
};

export default SubFolderComponent;