import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import ProfileCard from './ProfileCard';

const LandlordDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-purple-100 p-4 md:p-8">
      {/* Left Sidebar with Profile Card */}
<ProfileCard/>
      {/* Vertical Divider Left */}
      <div className="border-l border-gray-400 mx-2 hidden md:block" />

      {/* Right Sidebar with Search Bar and Navigation */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-start ">
        <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg shadow-md flex flex-col w-full md:w-1/2 h-full">
          {/* Top Navigation */}
          <div className="mb-4 md:mb-10"></div>

          {/* Links above the Search Bar */}
          <div className="flex space-x-4 mb-1">
            <a href="#my-properties" className="text-lg font-semibold px-4 py-2 bg-purple-100 rounded-md hover:bg-purple-200">My Properties</a>
            <a href="#bookings" className="text-lg font-semibold px-4 py-2 bg-purple-100 rounded-md hover:bg-purple-200">Bookings</a>
          </div>

          {/* Horizontal Divider */}
          <div className="border-t border-gray-400 mb-2 w-full" />

         
          
        </div>
        
      </div>
    </div>
  );
}

export default LandlordDashboard;
