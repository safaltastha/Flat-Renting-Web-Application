import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import FloorSelection from "./FloorSelection";

const GeneralCategory = ({ onChange }) => {
  // Using a single state object to manage counts
  const [roomCounts, setRoomCounts] = useState({
    numOfBedrooms: 0,
    numOfLivingRooms: 0,
    numOfKitchens: 0,
  });

  const handleInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [name]: value,
    }));
    onChange(name, value); // Update the parent state
  };

  const renderLengthAndWidthFields = (num, type) => {
    const lengthAndWidthFields = [];
    for (let i = 0; i < num; i++) {
      lengthAndWidthFields.push(
        <div key={i} className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Length of {type} {i + 1}
            </label>
            <input
              type="number"
              name={`${type}Length_${i + 1}`}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Width of {type} {i + 1}
            </label>
            <input
              type="number"
              name={`${type}Width_${i + 1}`}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
        </div>
      );
    }
    return lengthAndWidthFields;
  };

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
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bedrooms
              <span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="number"
              name="numOfBedrooms"
              value={roomCounts.numOfBedrooms}
              onChange={handleRoomChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {roomCounts.numOfBedrooms > 0 && renderLengthAndWidthFields(roomCounts.numOfBedrooms, "Bedroom")}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Living Rooms
            </label>
            <input
              type="number"
              name="numOfLivingRooms"
              value={roomCounts.numOfLivingRooms}
              onChange={handleRoomChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {roomCounts.numOfLivingRooms > 0 && renderLengthAndWidthFields(roomCounts.numOfLivingRooms, "Living Room")}
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bathrooms
            </label>
            <input
              type="number"
              name="numOfBathrooms"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Kitchens{" "}
              <span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="number"
              name="numOfKitchens"
              value={roomCounts.numOfKitchens}
              onChange={handleRoomChange}
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            {roomCounts.numOfKitchens > 0 && renderLengthAndWidthFields(roomCounts.numOfKitchens, "Kitchen")}
          </div>

          <FloorSelection />
        </div>
      </div>
    </div>
  );
};

export default GeneralCategory;
