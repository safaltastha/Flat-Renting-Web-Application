

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImLocation2 } from "react-icons/im";
import { ImPhone } from "react-icons/im";
import { ImMail } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DetailedViewPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const staticImages = [
    "/images/room.jpg",
    "/images/room2.jpg",
    "/images/room3.jpg",
    "/images/room4.jpg",
    "/images/room5.jpg",
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/properties/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading property: {error.message}</div>;

  return (
    <div className="container max-w-[1600px] px-36 mt-8">
      <p className="text-3xl font-semibold text-[#9747FF] ">
        {property.category} for rent in {property.locationCity}
      </p>

      {property ? (
        <div className="flex mt-6">
          {/* Left Section: Images, Property Details, and Map */}
          <div className="flex-1 pr-4">
            {/* Large Image */}
            <img
              src={staticImages[0]}
              alt="Large Property Image"
              className="w-full h-[600px] object-cover rounded-md shadow-lg"
            />

            {/* Property Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg mt-4">
              <div className="flex items-center space-x-2 mt-2">
                <ImLocation2 className="text-gray-600" size={18} />
                <span>{property.streetNumber} street,</span>
                <span>{property.streetName}</span>
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
                  {property.numOfLivingRooms || "No Living room"}
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
                  {property.facilities && Array.isArray(property.facilities)
                    ? property.facilities.join(", ")
                    : "No facilities listed"}
                </p>
                <p className="text-lg">
                  <strong>House Rules:</strong>{" "}
                  {property.houseRule || "No house rule"}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#9747FF] hover:bg-[#7735CC] transition-colors duration-300 px-20 py-3 rounded-md text-white text-lg font-semibold mt-6 shadow-lg"
                  onClick={() => navigate("/booknow")}
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12">
              <p className="text-2xl font-semibold">Find the property on map</p>
              <img
                src="/images/map.jpeg"
                alt="Map"
                className="w-full h-[300px] object-cover rounded-md shadow-lg mt-4"
              />
            </div>
          </div>

          {/* Right Section: Smaller Images and Contact Info */}
          <div className="w-[30%] sticky top-0">
            {/* Smaller Images */}
            <div className="flex flex-col space-y-2">
              {/* Only showing two images initially */}
              {staticImages.slice(1, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Small Image ${index + 1}`}
                  className="w-full h-[300px] object-cover rounded-md shadow-lg"
                />
              ))}

              {/* Button to show all images */}
              <button
                className="text-[#9747FF] mt-2 underline text-xl"
                onClick={() => setShowAllImages(!showAllImages)}
              >
                {showAllImages ? "Show Less" : "Show More Images"}
              </button>

              {/* If showAllImages is true, display additional images */}
              {showAllImages &&
                staticImages
                  .slice(3, 5)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Small Image ${index + 3}`}
                      className="w-full h-[300px] object-cover rounded-md shadow-lg"
                    />
                  ))}
            </div>

            {/* Contact Info */}
            <div
              className="space-y-3 bg-white p-6 rounded-lg shadow-2xl mt-4 sticky top-0 z-10"
              style={{ marginTop: "16px" }}
            >
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
      ) : (
        <div>No property found</div>
      )}
    </div>
  );
};

export default DetailedViewPage;