import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const GeneralCategory = () => {
  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">General Category</h2>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Property Type
              <span className="text-red-600 text-[20px] ml-1"> *</span>
            </label>
            <div className="relative">
              <select
                name="category"
                required
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none"
                style={{
                  backgroundImage: "none", // Ensure no default arrow
                  backgroundColor: "white", // Consistent background color
                }}
              >
                <option value="" className=""></option>
                <option value="flat">Flat</option>
                <option value="room">Room</option>
                <option value="apartment">Apartment</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <RiArrowDownSLine className="h-5 w-5 text-black" />
              </div>
            </div>
          </div>

          {/* Number of Spaces */}
          <div className="flex-1">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Spaces<span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="number"
              name="numOfSpaces"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Number of Bedrooms, Living Rooms, Bathrooms, Kitchens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Number of Bedrooms */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bedrooms
            </label>
            <input
              type="number"
              name="numOfBedrooms"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Number of Living Rooms */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Living Rooms
            </label>
            <input
              type="number"
              name="numOfLivingRooms"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Number of Bathrooms */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bathrooms
            </label>
            <input
              type="number"
              name="numOfBathrooms"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Number of Kitchens */}
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Kitchens
            </label>
            <input
              type="number"
              name="numOfKitchens"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Which Floor?<span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="text"
              name="numOfSpaces"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCategory;