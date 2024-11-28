import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const FloorSelection = ({ handleInputChange }) => {
  const floorOptions = ["first", "second", "third", "fourth", "fifth"];

  return (
    <div className="flex-1">
      <label className="block mb-2 font-medium text-[#9747FF]">
        Select a Floor
        <span className="text-red-600 text-[20px] ml-1">*</span>
      </label>
      <div className="relative">
        <select
          name="floor"
          required
          onChange={handleInputChange}
          className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none"
        >
          <option value="" disabled>
            Select Floor
          </option>
          {floorOptions.map((floor) => (
            <option key={floor} value={floor}>
              {floor.charAt(0).toUpperCase() + floor.slice(1)}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <RiArrowDownSLine className="h-5 w-5 text-black" />
        </div>
      </div>
    </div>
  );
};

export default FloorSelection;
