import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import ProfileCard from './ProfileCard';

const TenantDashboard = () => {
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
            <a href="#my-bookings" className="text-lg font-semibold px-4 py-2 bg-purple-100 rounded-md hover:bg-purple-200">My Bookings hello i am tenant</a>
            <a href="#my-save" className="text-lg font-semibold px-4 py-2 bg-purple-100 rounded-md hover:bg-purple-200">My Save</a>
          </div>

          {/* Horizontal Divider */}
          <div className="border-t border-gray-400 mb-2 w-full" />

          {/* Search Bar and Filter Icon */}
          <div className="relative flex items-center mb-4 w-full">
            <div className="flex items-center bg-white p-2 rounded-lg shadow-md flex-grow mr-2">
              <IoMdSearch className="mr-4 text-2xl" />
              <input 
                type="text" 
                placeholder="Search Properties" 
                className="flex-grow p-1 text-gray-700 text-base focus:outline-none" 
              />
            </div>

            <div onClick={toggleDropdown} className="cursor-pointer relative">
              <IoFilterOutline className="mr-2 text-2xl" /> {/* Filter icon */}
            </div>

            {/* Dropdown for Filter Options */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+4px)] bg-white shadow-md rounded-md z-10 flex flex-col w-40 p-2">
                <ul>
                  <li className="py-1 hover:bg-purple-100 cursor-pointer">Location</li>
                  <li className="py-1 hover:bg-purple-100 cursor-pointer">High to Low</li>
                  <li className="py-1 hover:bg-purple-100 cursor-pointer">Low to High</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;

