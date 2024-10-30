import React, { useState } from "react";

const LocationField = ({ onChange }) => {
  const handleLocationChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              City<span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="text"
              name="locationCity"
              onChange={handleLocationChange}
              required
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Ex: Ranipauwa"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Street Number
              <span className="text-red-600 text-[20px] ml-1">*</span>
            </label>
            <input
              type="number"
              name="locationStreetNumber"
              onChange={handleLocationChange}
              required
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              Street name
              <span className="text-red-600 ml-1 text-[20px]">*</span>
            </label>
            <input
              type="text"
              name="StreetName"
              onChange={handleLocationChange}
              required
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* <div>
              <label className="block mb-2 font-medium text-[#9747FF]">
                Locate Your Property on Map
              </label>
              <input
                type="text"
                name="locationCityinMap"
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default LocationField;
