import React from 'react'
import { MdMailOutline } from "react-icons/md";

const ProfileCard = () => {
  return (
    <div>
              <div className="flex-grow flex items-center justify-center mb-4 md:mb-0">
        <div className="bg-white bg-opacity-10 p-6 md:p-12 rounded-lg shadow-md flex flex-col items-center">
          {/* Profile Image */}
          <img 
            src="https://cbiboca.org/wp-content/uploads/2021/08/52-521023_download-free-icon-female-vectors-blank-facebook-profile-e1628513537921.jpg" 
            alt="Profile" 
            className="h-32 md:h-40 rounded-full object-cover mb-4"
          />
          {/* User Info */}
          <div className="flex flex-col items-start">
            <h2 className="mt-5 text-xl md:text-2xl font-semibold">Shreya Thapa</h2>
            <p className="mt-2 md:mt-5 text-base flex items-center">
              <MdMailOutline className="mr-2" />
              shreya123@gmail.com
            </p>
          </div>

          {/* Edit Profile Button */}
          <button className="mt-6 px-5 py-2 bg-purple-600 text-white text-lg rounded-md">
            Edit Profile
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProfileCard