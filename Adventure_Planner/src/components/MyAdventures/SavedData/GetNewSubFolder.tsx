import React, { useState, useEffect } from "react";
import { getSubFolderById } from "./GetSubFolderById";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface GetSubFolderProps {
    userId: string;
    parentFolderId: string;
    subFolderId: string;
}

const GetNewSubFolder: React.FC<GetSubFolderProps> = ({ userId, parentFolderId, subFolderId }) => {
    const [subFolderTitle, setSubFolderTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate(-1);
    };

    useEffect(() => {
        const fetchSubFolder = async () => {
            setLoading(true);
            setError(null);

            try {
                const subFolder = await getSubFolderById(userId, parentFolderId, subFolderId);

                if (subFolder) {
                    setSubFolderTitle(subFolder.title);
                } else {
                    setError("Subfolder not found.");
                }
            } catch (error) {
                setError("Failed to fetch subfolder details.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubFolder();
    }, [userId, parentFolderId, subFolderId]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
            <div className="absolute left-0 ml-96">
                    <button 
                      onClick={handleBackClick}
                    >
                      <ArrowCircleLeft className="rounded-full shadow-black text-gray-600 hover:text-gray-800 cursor-pointer" weight="fill" size={32} />
                    </button>
                  </div>
            <h1 className="text-2xl font-bold text-center w-full">{subFolderTitle}</h1>
            </div>
            <h2 className="mt-6 mb-2 font-medium text-lg text-center w-full">🚧 Under Construction 🚧</h2>
            <div className="text-center max-w-md mx-auto text-gray-800">
            <p className="mb-2">This folder is still on its journey and not quite ready for you yet. But don't worry! There are plenty of other folders to explore while we put the finishing touches here. ✨</p>
            <p>If you go back a step, you can save flights, accommodations, and activities in the existing folders or create new Wanderlists. Give them a title that sparks excitement and matches the adventure you're planning.</p>
            <p className="font-medium mt-3">Your next great journey awaits! 🧳🌍</p>
            </div>
        </div>
    );
}

export default GetNewSubFolder;