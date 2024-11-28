import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";

const PropertyCard = ({ property, isSelected, onClick }) => {
  const [isAvailable, setIsAvailable] = useState(true);
  return (
    <div
      className={` property-card bg-[#D9D9D9] border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 hover:transition-transform duration-300 ease-in-out cursor-pointer ${
        isSelected
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }
      `}
      onClick={onClick}
    >
      <div className="relative">
        {/* Image */}
        <img
          src={property.image ? property.image : "/images/room.jpg"}
          alt={`${property.category} - ${property.locationCity}`}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-3 text-[#3B0C96]">
          {property.category} for Rent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-2 space-x-1">
              <ImLocation2 className="text-gray-600 " size={18} />
              <p className="text-gray-700 font-medium text-sm">
                {property.locationCity}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-700">
              NRs {property.monthlyRent} / month
            </p>
          </div>
          <div>
            <p className="text-sm mb-1">
              <span className="font-medium text-gray-700">Total Spaces:</span>{" "}
              {property.numOfSpaces}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-700">Parking:</span>{" "}
              {property.parking ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to={`/properties/${property.id}`}
            className="inline-block px-5 py-1 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>

        <div
          className={`absolute top-5 right-2 px-5 py-1 rounded-md text-white text-xs font-semibold ${
            isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Booked"}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
