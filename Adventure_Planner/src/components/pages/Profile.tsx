import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container mt-24 p-4">
      <h2 className="text-center text-2xl font-medium">
        Welcome, {"Adventurer"}!
      </h2>
      <p className="text-gray-200">Email: {user.email}</p>
      <p className="text-gray-200">UID: {user.uid}</p>
    </div>
  );
};

export default Profile;
