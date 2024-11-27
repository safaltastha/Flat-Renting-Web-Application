import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ImLocation2, ImPhone, ImMail } from "react-icons/im";
import { GrLocation } from "react-icons/gr";

import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import Ratings from "../Ratings";
import { useUser } from "../../context/UserContext";

const DetailedViewPage = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const { auth } = useUser();

  useEffect(() => {
    const fetchPropertyAndRatings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/properties/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setProperty(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyAndRatings();
  }, [propertyId, auth.accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container max-w-[1600px] px-36 mt-8">
      <p className="text-3xl font-semibold text-[#9747FF]">
        {property?.category.charAt(0).toUpperCase() +
          property.category.slice(1)}{" "}
        for rent in{" "}
        {property?.locationCity.charAt(0).toUpperCase() +
          property.locationCity.slice(1)}
      </p>

      <div className="flex mt-6">
        {/* Left Section */}
        <div className="flex-1 pr-4">
          {/* Large Image */}
          {property.media?.length > 0 && (
            <img
              src={property.media[0].file_path}
              alt="Large Property"
              className="w-full h-[600px] object-contain rounded-md shadow-lg"
            />
          )}

          {/* Property Details */}
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg mt-4">
            <div className="flex items-center space-x-2 mt-2">
              <ImLocation2 className="text-gray-600" size={18} />
              <span>{property.locationStreetNumber} street,</span>
              <span>{property.StreetName},</span>
              <span>{property.locationCity}</span>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              <strong>Description:</strong>{" "}
              {property.description || "No description available"}
            </p>
            <p className="text-3xl font-bold text-[#9747FF] border-b-2 pb-2 border-gray-300">
              Features
            </p>
            <div className="space-y-3 text-gray-700">
              <p className="text-lg">
                <strong>Bedrooms:</strong> {property.numOfBedrooms}
              </p>
              <p className="text-lg">
                <strong>Bathrooms:</strong> {property.numOfBathrooms}
              </p>
              <p className="text-lg">
                <strong>Living Rooms:</strong>{" "}
                {property.numOfLivingrooms || "No Living room"}
              </p>
              <p className="text-lg">
                <strong>Kitchen:</strong> {property.numOfKitchens}
              </p>
              <p className="text-lg">
                <strong>Floor:</strong> {property.floor}
              </p>
              <p className="text-lg">
                <strong>Monthly Rent:</strong> NRs. {property.monthlyRent}
              </p>
              <p className="text-lg">
                <strong>Advanced Rent:</strong> NRs.{" "}
                {property.advancedRent || "No advanced rent needed"}
              </p>
              <p className="text-lg">
                <strong>Facilities:</strong>{" "}
                {Object.entries(property.features)
                  .filter(([_, value]) => value)
                  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                  .join(", ") || "None"}
              </p>
              <p className="text-lg">
                <strong>House Rules:</strong>{" "}
                {property.houseRule || "No house rule"}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#9747FF] hover:bg-[#7735CC] transition-colors duration-300 px-20 py-3 rounded-md text-white text-lg font-semibold mt-6 shadow-lg"
                onClick={() => {
                  localStorage.setItem(
                    "selectedProperty",
                    JSON.stringify(property)
                  );
                  navigate("/bookproperty");
                }}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="my-12">
            <p className="text-2xl font-semibold">Find the property on map</p>
            <iframe
              src="https://www.google.com/maps/embed?... (YOUR EMBEDDED MAP LINK)"
              width="600"
              height="300"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[30%] sticky top-0">
          <div className="flex flex-col space-y-2">
            {property.media?.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image.file_path}
                alt={`Small Property Image ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-md shadow-lg"
              />
            ))}
            <button
              className="text-[#9747FF] mt-2 underline text-xl"
              onClick={() => setShowAllImages(!showAllImages)}
            >
              {showAllImages ? "Show Less" : "Show More Images"}
            </button>
            {showAllImages &&
              property.media
                .slice(3)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image.file_path}
                    alt={`Additional Image ${index + 3}`}
                    className="w-full h-[300px] object-cover rounded-md shadow-lg"
                  />
                ))}
          </div>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-2xl mt-4">
            <p className="text-2xl font-semibold">Contact Information</p>
            <div className="flex items-center">
              <FaUserCircle className="mr-3 text-xl" />
              <span className="text-lg">John Doe</span>
            </div>
            <div className="flex items-center">
              <ImPhone className="mr-3 text-xl" />
              <span className="text-lg">+977-9800000000</span>
            </div>
            <div className="flex items-center">
              <ImLocation2 className="mr-3 text-xl" />
              <span className="text-lg">
                Street 9, Janapriya Marga, Nayabazar
              </span>
            </div>
            <div className="flex items-center">
              <ImMail className="mr-3 text-xl" />
              <span className="text-lg">landlord@example.com</span>
            </div>
            <div className="text-lg font-semibold text-red-500">
              Available: Everyday after 5pm
            </div>
          </div>
        </div>
      </div>
      <Ratings />
    </div>
  );
};

export default DetailedViewPage;
