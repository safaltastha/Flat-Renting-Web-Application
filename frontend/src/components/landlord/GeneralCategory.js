import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import FloorSelection from "../../components/landlord/FloorSelection";

console.log("FloorSelection:", FloorSelection);

const LengthWidthFields = ({ num, type, onChange }) => {
  return [...Array(num)].map((_, i) => (
    <div
      key={i}
      className="flex space-x-4 my-4 p-4 border rounded-lg bg-gray-150"
    >
      <div className="flex-1">
        <label className="block mb-2 font-medium text-[#9747FF]">
          Length of {type} {i + 1}
        </label>
        <input
          type="number"
          name={`${type}Length_${i + 1}`}
          onChange={onChange}
          min="0"
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
          onChange={onChange}
          min="0"
          className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
    </div>
  ));
};

const GeneralCategory = ({ onChange, onRoomDimensionsChange }) => {
  const [roomCounts, setRoomCounts] = useState({
    numOfBedrooms: 0,
    numOfLivingRooms: 0,
    numOfKitchens: 0,
  });

  const [roomDimensions, setRoomDimensions] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: value,
    }));

    onChange(name, value);
    console.log(`Input changed: ${name} = ${value}`);
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10) || 0;

    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [name]: parsedValue,
    }));

    onChange(name, parsedValue); // Update parent state
  };

  const handleFloorSelect = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const handleRoomDimensionsChange = (e) => {
    const { name, value } = e.target;
    onRoomDimensionsChange(name, value); // Propagate room dimension changes to parent
  };

  useEffect(() => {
    console.log("Current Room Dimensions in general category:", roomDimensions);
  }, [roomDimensions]);

  return (
    <div className="p-4">
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
            Number of Bedrooms
            <span className="text-red-600 ml-1 text-[20px]">*</span>
          </label>
          <input
            type="number"
            name="numOfBedrooms"
            value={roomCounts.numOfBedrooms}
            onChange={handleRoomChange}
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          {roomCounts.numOfBedrooms > 0 && (
            <LengthWidthFields
              num={roomCounts.numOfBedrooms}
              type="Bedroom"
              onChange={handleRoomDimensionsChange}
            />
          )}
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
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          {roomCounts.numOfLivingRooms > 0 && (
            <LengthWidthFields
              num={roomCounts.numOfLivingRooms}
              type="Living Room"
              onChange={handleRoomDimensionsChange}
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-[#9747FF]">
            Number of Bathrooms
          </label>
          <input
            type="number"
            name="numOfBathrooms"
            onChange={handleRoomChange}
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-[#9747FF]">
            Number of Kitchens
            <span className="text-red-600 ml-1 text-[20px]">*</span>
          </label>
          <input
            type="number"
            name="numOfKitchens"
            value={roomCounts.numOfKitchens}
            onChange={handleRoomChange}
            min="0"
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          {roomCounts.numOfKitchens > 0 && (
            <LengthWidthFields
              num={roomCounts.numOfKitchens}
              type="Kitchen"
              onChange={handleRoomDimensionsChange}
            />
          )}
        </div>

        {/* Floor Selection */}
        <FloorSelection handleInputChange={handleFloorSelect} />
      </div>
    </div>
  );
};

export default GeneralCategory;
