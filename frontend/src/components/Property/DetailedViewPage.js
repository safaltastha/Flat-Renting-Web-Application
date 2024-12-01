import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImLocation2, ImPhone, ImMail } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GiBathtub } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";
import { PiCookingPotDuotone } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiCircleList } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import GiveRating from "../GiveRating";
import GetRating from "../GetRating";
import { useUser } from "../../context/UserContext";
import GetRating from "../GetRating";
import GiveRating from "../GiveRating";

import SaveProperty from "./SaveProperty";

const DetailedViewPage = ({ propertyId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useUser();

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
    <div className="container max-w-[1600px] px-12 md:px-36 mt-8">
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
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 mt-2 text-3xl md:text-xl">
                  <GrLocation
                    className="text-gray-600 flex md:hidden"
                    size={36}
                  />
                  <GrLocation
                    className="text-gray-600 hidden md:flex"
                    size={18}
                  />
                  <span>{property.locationStreetNumber} street,</span>
                  <span>{property.StreetName},</span>
                  <span>{property.locationCity}</span>
                </div>
                <div>
                  <SaveProperty propertyId={id} />
                </div>
              </div>
              <p className="text-4xl md:text-xl font-semibold text-gray-800">
                <strong>Description:</strong>{" "}
                {property.description || "No description available"}
              </p>

              <p className="text-5xl md:text-3xl font-bold text-[#9747FF] border-b-2 pb-2 border-gray-300">
                Features
              </p>

              <div className="space-y-3 text-gray-700 text-4xl md:text-lg">
                <ul className="grid grid-cols-1 md:grid-cols-2  gap-12  md:gap-4">
                  <li className="flex gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <MdOutlineBedroomParent
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <MdOutlineBedroomParent
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">BEDROOMS</span>
                      <span className="font-bold">
                        {property.numOfBedrooms}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <GiBathtub
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <GiBathtub
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">BATHROOMS</span>
                      <span className="font-bold">
                        {property.numOfBathrooms}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <LuSofa
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <LuSofa
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">LIVING ROOMS</span>
                      <span className="font-bold">
                        {property.numOfLivingrooms || "No Living room"}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <PiCookingPotDuotone
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <PiCookingPotDuotone
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">KITCHEN</span>
                      <span className="font-bold">
                        {property.numOfKitchens}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <FaRegBuilding
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <FaRegBuilding
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">FLOOR</span>
                      <span className="font-bold">{property.floor}</span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <GiMoneyStack
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <GiMoneyStack
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">MONTHLY RENT</span>
                      <span className="font-bold">
                        NRs.{property.monthlyRent}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex  items-center ">
                      <GiTakeMyMoney
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <GiTakeMyMoney
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">ADVANCED RENT</span>
                      <span className="font-bold">
                        NRs.{" "}
                        {property.advancedRent || "No advanced rent needed"}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <CiCircleList
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <CiCircleList
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">FACILITIES</span>
                      <span className="font-bold">
                        {Object.entries(property.features)
                          .filter(([key, value]) => value)
                          .map(
                            ([key]) =>
                              key.charAt(0).toUpperCase() + key.slice(1)
                          )
                          .join(", ") || "None"}
                      </span>
                    </div>
                  </li>
                  <li className="flex  gap-8 md:gap-4">
                    <div className="flex items-center ">
                      <GoChecklist
                        style={{ fontSize: "30px" }}
                        className="hidden md:flex"
                      />
                      <GoChecklist
                        style={{ fontSize: "50px" }}
                        className="flex md:hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-0">
                      <span className="">HOUSE RULES</span>
                      <span className="font-bold">
                        {property.houseRule || "No house rule"}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#9747FF] hover:bg-[#7735CC] transition-colors duration-300 px-20 py-3 rounded-md text-white text-3xl md:text-lg font-semibold mt-6 shadow-lg"
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
              <p className="text-4xl md:text-2xl font-semibold">
                Contact Information
              </p>
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
