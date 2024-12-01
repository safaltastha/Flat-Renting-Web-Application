import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { RiParkingBoxLine } from "react-icons/ri";
import { PiWarehouse } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { useUser } from "../../context/UserContext";
import SavePropertyButton from "./SaveProperty";

const PropertyCard = ({ property, isSelected, onClick }) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const { user } = useUser();
  const { id } = useParams();

  // Extract the first image path from the media array
  const propertyImage = property.media
    ?.find((mediaItem) => mediaItem.file_type === "image")
    ?.file_path.replace(/\\/g, "/");


  
  return (
    <div
      className={`h-full border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 hover:transition-transform duration-300 ease-in-out cursor-pointer ${
        isSelected
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-[600px] md:h-48 w-full">
        <img
          src={propertyImage}
          alt={`${property.category} - ${property.locationCity}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details */}
      <div className="p-4 sm:h-auto h-[300px]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-purple-500">
              {`${
                property.category.charAt(0).toUpperCase() +
                property.category.slice(1)
              } for Rent`}
            </h2>
          </div>
          <div>
            <SavePropertyButton propertyId={id} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-2 space-x-1">
              <GrLocation className="text-gray-600" size={18} />
              <p className="text-gray-700 font-medium text-sm">
                {property.locationCity}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-700 flex">
              <span className="flex items-center mr-2">
                <GiMoneyStack />
              </span>
              {property.monthlyRent} /{" "}
              <span className="text-xs flex items-end">month</span>
            </p>
          </div>
          <div>
            <p className="text-sm mb-1 flex gap-2">
              <span className="flex items-center">
                <PiWarehouse />
              </span>
              <span className="font-medium text-gray-700">Total Spaces:</span>{" "}
              {property.numOfSpaces}
            </p>
            <p className="text-sm flex gap-2">
              <span className="flex items-center">
                <RiParkingBoxLine />
              </span>{" "}
              <span className="font-medium text-gray-700">Parking:</span>{" "}
              {property.parking ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {user.role === "tenant" && (
            <Link
              to={`/properties/${property.id}`}
              className="inline-block px-5 py-1 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              View Details
            </Link>
          )}
        </div>

        <div
          className={`absolute top-8 md:top-3 right-5 md:right-1 px-5 py-1 rounded-md text-gray-600 text-xl md:text-xs font-semibold ${
            isAvailable ? "bg-green-400" : "bg-red-500"
          }`}
        >
          {isAvailable ? "Available" : "Booked"}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
