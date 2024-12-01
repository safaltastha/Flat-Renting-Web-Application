import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImLocation2, ImPhone, ImMail } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Rating from "../Ratings";
import { useUser } from "../../context/UserContext";
import GetRating from "../GetRating";
import GiveRating from "../GiveRating";

const DetailedViewPage = ({ propertyId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { auth } = useUser();
  const { dimensions } = property || {};

  const fetchProperty = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:3002/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`, // Add token to the Authorization header
          },
          withCredentials: true, // Send cookies with the request (if needed for session)
        }
      );

      setProperty(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading property: {error.message}</div>;

  function capitalizeFirstLetter(name) {
    if (!name) return ""; // Handle cases where the name is undefined or null
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const handleNewRating = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const formatDate = (dateStr) => {
    const [month, day, year] = dateStr.split("/");
    return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
  };

  return (
    <div className="container max-w-[1600px] px-36 mt-8">
      <p className="text-3xl font-semibold text-[#9747FF] ">
        {property.category.charAt(0).toUpperCase() + property.category.slice(1)}{" "}
        for rent in{" "}
        {property.locationCity.charAt(0).toUpperCase() +
          property.locationCity.slice(1)}
      </p>

      {property ? (
        <div className="flex mt-6">
          {/* Left Section: Images, Property Details, and Map */}
          <div className="flex-1 pr-4">
            {/* Large Image */}
            {property.media?.length > 0 && (
              <div className="w-full h-[600px] rounded-md shadow-lg overflow-hidden">
                <img
                  src={property.media[0].file_path}
                  alt="Large Property Image"
                  className="w-full h-full object-cover"
                />
              </div>
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
                  <strong>Total space:</strong>{" "}
                  {property.numOfSpaces || "No bedroom"}
                </p>

                <div>
                  {dimensions ? (
                    <div>
                      <h3>Dimensions(in inch)</h3>
                      <div>
                        <h4>Bedrooms:{property.numOfBedrooms}</h4>
                        {dimensions.bedrooms?.map((room, index) => (
                          <p key={index}>
                            Length of Bedroom {index + 1}: {room.length},
                            Breadth of Bedroom {index + 1}: {room.breadth}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h4>Kitchens:{property.numOfKitchens}</h4>
                        {dimensions.kitchens?.map((room, index) => (
                          <p key={index}>
                            Length: {room.length}, Breadth: {room.breadth}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h4>Living Rooms:{property.numOfLivingrooms}</h4>
                        {dimensions.livingrooms?.map((room, index) => (
                          <p key={index}>
                            Length: {room.length}, Breadth: {room.breadth}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>No dimensions available</p>
                  )}
                </div>

                <p className="text-lg">
                  <strong>Floor:</strong> {property.floor || "No Floor"}
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
                    .filter(([key, value]) => value)
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28129.0477250726!2d83.98528161614638!3d28.203342149521294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1727537868376!5m2!1sen!2snp"
                width="600"
                height="300"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div>
              <GetRating
                propertyId={id}
                onNewRating={handleNewRating}
                review={reviews}
                ratingId={property.ratingId}
              />
            </div>

            <div>
              <GiveRating propertyId={id} />
            </div>
          </div>

          {/* Right Section: Smaller Images and Contact Info */}
          <div className="w-[30%] sticky top-0">
            {/* Smaller Images */}
            {/* Smaller Images */}
            <div className="flex flex-col space-y-2">
              {/* Display the first two smaller images, if they exist */}
              {property.media
                ?.slice(1, 3)
                .filter((image) => image?.file_path) // Filter only valid images
                .map((image, index) => (
                  <img
                    key={index}
                    src={image.file_path}
                    alt={`Small Image ${index + 1}`}
                    className="w-full h-[300px] object-cover rounded-md shadow-lg"
                  />
                ))}

              {/* Button to show all images */}
              {property.media?.length > 3 && ( // Show button only if there are more than 3 images
                <button
                  className="text-[#9747FF] mt-2 underline text-xl"
                  onClick={() => setShowAllImages(!showAllImages)}
                >
                  {showAllImages ? "Show Less" : "Show More Images"}
                </button>
              )}

              {/* If showAllImages is true, display additional images */}
              {showAllImages &&
                property.media
                  ?.slice(3)
                  .filter((image) => image?.file_path) // Filter only valid images
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image?.file_path}
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
                <span className="text-lg">
                  {capitalizeFirstLetter(property.landlord.firstName)}{" "}
                  {capitalizeFirstLetter(property.landlord.lastName)}
                </span>
              </div>

              <div className="flex items-center">
                <ImPhone className="mr-3 text-xl" />
                <span className="text-lg">
                  {property.landlord.phoneNumber || "Not Available"}
                </span>
              </div>
              <div className="flex items-center">
                <ImLocation2 className="mr-3 text-xl" />
                <span className="text-lg">
                  {property.landlord.address || "Not Available"}
                </span>
              </div>

              <div className="flex items-center">
                <ImMail className="mr-3 text-xl" />
                <span className="text-lg">
                  {property.landlord.email || "Not Available"}
                </span>
              </div>
              <div className="text-2xl font-semibold ">
                Landlord Availability
              </div>
              <div className="text-lg  text-red-500">
                Available Start:{" "}
                {property?.availableStart
                  ? new Date(property.availableStart).toLocaleDateString()
                  : "Not Available"}
              </div>

              <div className="text-lg  text-red-500">
                Available End:{" "}
                {property?.availableEnd
                  ? new Date(property.availableEnd).toLocaleDateString()
                  : "Not Available"}
              </div>

              <div className="text-lg  text-red-500">
                Availability Time:{" "}
                {property?.availabilityTime || "Not Available"}
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
