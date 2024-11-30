import React from "react";
import { MdMailOutline } from "react-icons/md";
import { useUser } from "../../context/UserContext";
import { MdLocationOn } from "react-icons/md";

const ProfileCard = () => {
  const { user } = useUser();

  function capitalizeFirstLetter(name) {
    if (!name) return ""; // Handle cases where the name is undefined or null
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="text-center">
      <div className="space-y-3">
        {/* Profile Image */}
        <img
          src="https://cbiboca.org/wp-content/uploads/2021/08/52-521023_download-free-icon-female-vectors-blank-facebook-profile-e1628513537921.jpg"
          alt="Profile"
          className="h-24 mx-auto md:h-24 rounded-full object-cover"
        />
        {/* Profile Name */}
        <p className="font-medium">
          {capitalizeFirstLetter(user.firstName)}{" "}
          {capitalizeFirstLetter(user.lastName)}
        </p>
        <p className="text-sm text-gray-500">
          {user.phoneNumber} | {user.email}
        </p>
        {/* Location */}
        <p className="text-sm text-gray-600">{user.address}</p>
      </div>
      {/* Edit Profile Button */}
      <button className="mt-6 px-8 py-2 bg-purple-600 text-white text-lg rounded-md">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
