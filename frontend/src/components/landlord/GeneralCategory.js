import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import FloorSelection from "./FloorSelection";

const GeneralCategory = ({ onChange, onRoomDimensionsChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
    console.log(`Input changed: ${name} = ${value}`);
  };

  const handleFloorSelect = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="px-4">
      <h2 className="text-lg font-medium mb-4">General Category</h2>

      {/* Property Type and Number of Spaces */}
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none"
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

        <div className="flex-1">
          <label className="block mb-2 font-medium text-[#9747FF]">
            Number of Spaces
            <span className="text-red-600 ml-1 text-[20px]">*</span>
          </label>
          <input
            type="number"
            name="numOfSpaces"
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Room Counts and Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-2 font-medium text-[#9747FF]">
            Number of Bathrooms
          </label>
          <input
            type="number"
            name="numOfBathrooms"
            onChange={handleInputChange}
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>
      {/* Floor Selection */}
      <FloorSelection handleInputChange={handleFloorSelect} />
    </div>
  );
};

export default GeneralCategory;
