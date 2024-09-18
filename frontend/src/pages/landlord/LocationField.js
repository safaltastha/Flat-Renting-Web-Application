import React from "react";

const LocationField = () => {
  return (
    <div>
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium text-[#9747FF]">
              City<span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              name="locationCity"
              className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Ex: Ranipauwa"
            />
          </div>

          <div>
              <label className="block mb-2 font-medium text-[#9747FF]">
                Street Number<span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="locationStreetNumber"
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#9747FF]">
                Locate Your Property on Map
              </label>
              <input
                type="text"
                name="locationCityinMap"
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default LocationField;
