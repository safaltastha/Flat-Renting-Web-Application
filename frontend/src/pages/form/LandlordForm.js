import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralCategory from "../../components/landlord/GeneralCategory";
import LocationField from "../../components/landlord/LocationField";
import Rent from "../../components/landlord/Rent";
import DescriptionAndRules from "../../components/landlord/DescriptionAndRules";
import AudioVideo from "../../components/landlord/AudioVideo";
import Cookies from "js-cookie";

const LandlordForm = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    locationCity: "",
    locationStreetNumber: "",
    numOfSpaces: "",
    numOfBedrooms: "",
    numOfKitchens: "",
    numOfLivingRooms: "",
    monthlyRent: "",
    advancedRent: "",
    description: "",
    houseRule: "",
    numOfBathrooms: "",
    features: {
      electricity: false,
      parking: false,
      wifi: false,
      petAllowed: false,
    },
    floor: "",
    availableStart: "",
    availableEnd: "",
    availabilityTime: "",
  });
  const navigate = useNavigate();

  const capitalizeWords = (value) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleFilesChange = (imageFiles, videoFiles) => {
    setImages(imageFiles);
    setVideos(videoFiles);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked, // Update the specific facility's value
      },
    }));
  };

  const handleRoomsChange = (index, roomType, field, value) => {
    console.log();
    setRooms((prev) => {
      const updatedRooms = [...prev];
      if (!updatedRooms[index]) {
        updatedRooms[index] = { roomType, length: 0, width: 0 };
      }
      updatedRooms[index][field] = value;
      return updatedRooms;
    });
  };

  const handleRoomDimensionsChange = (name, value) => {
    console.log("Room Dimension Change from landlord form - Name:", name, "Value:", value);
    // You can also update your formData or room data here if necessary
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const startDate = new Date(formData.availableStart);
    const endDate = new Date(formData.availableEnd);
    if (endDate < startDate) {
      alert("Availability End date cannot be before Availability Start date.");
      return;
    }
    // Validation for minimum number of images
    if (images.length < 3) {
      alert("Please upload at least 3 images.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image .");
      return;
    }

    const featuresData = {
      wifi: formData.features.wifi,
      parking: formData.features.parking,
      electricity: formData.features.electricity,
      petAllowed: formData.features.petAllowed,
    };

    const propertyData = new FormData();
    propertyData.append("category", formData.category || "");
    propertyData.append("locationCity", formData.locationCity || "");
    propertyData.append(
      "locationStreetNumber",
      formData.locationStreetNumber || ""
    );
    propertyData.append("numOfSpaces", formData.numOfSpaces || 0);
    propertyData.append("numOfBedrooms", formData.numOfBedrooms || 0);
    propertyData.append("numOfLivingrooms", formData.numOfLivingRooms || 0);
    propertyData.append("numOfBathrooms", formData.numOfBathrooms || 0);
    propertyData.append("numOfKitchens", formData.numOfKitchens || 0);
    propertyData.append("monthlyRent", formData.monthlyRent || 0);
    propertyData.append("advancedRent", formData.advancedRent || 0); // Use default value if empty
    propertyData.append("description", formData.description || "");
    propertyData.append("houseRule", formData.houseRule || "");
    propertyData.append("features", JSON.stringify(featuresData));
    propertyData.append("floor", formData.floor || "");
    propertyData.append("StreetName", formData.StreetName || "");
    propertyData.append("entityType", "property");

    propertyData.append("availableStart", formData.availableStart);
    propertyData.append("availableEnd", formData.availableEnd);

    propertyData.append("availabilityTime", formData.availabilityTime);

    // Append images and videos to FormData
    images.forEach((image) => {
      propertyData.append("propertyImage", image);
    });
    videos.forEach((video) => {
      propertyData.append("propertyVideo", video);
    });

    const token = Cookies.get("token");
    console.log("Token before submission:", token);

    console.log("Property Data contents:");
    propertyData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post(
        "http://localhost:3002/properties",
        propertyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate("/");
        alert("Property posted successfully!");
      }
    } catch (error) {
      console.error(
        "Error posting property:",
        error.response?.data || error.message
      );
      alert("Failed to post property. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-custom-gray shadow-lg rounded-lg my-12">
      <form className="space-y-6" method="post" onSubmit={handleSubmit}>
        <LocationField
          capitalizeWords={capitalizeWords}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <GeneralCategory
          onChange={handleRoomsChange}
          onRoomDimensionsChange={handleRoomDimensionsChange}
        />
        <Rent onChange={handleChange} />
        <DescriptionAndRules
          capitalizeWords={capitalizeWords}
          onChange={handleChange}
        />
        <div className="p-4">
          <label className="block mb-2 font-medium text-[#9747FF]">
            Facilities<span className="text-red-600 ml-1 text-[20px]">*</span>
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="electricity"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
                checked={formData.features.electricity || false}
              />
              <span className="mr-2 text-[#777777]">Electricity</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="parking"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
                checked={formData.features.parking || false}
              />
              <span className="mr-2 text-[#777777]">Parking</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="wifi"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
                checked={formData.features.wifi || false}
              />
              <span className="mr-2 text-[#777777]">WiFi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="petAllowed"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
                checked={formData.features.petAllowed || false}
              />
              <span className="mr-2 text-[#777777]">Pet Allowed</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mt-9  ">
            Availability Start and Availability End
          </h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Availability Start
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="date"
                name="availableStart"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              ></input>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Availability End
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="date"
                name="availableEnd"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              ></input>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Your availability time{" "}
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="text"
                name="availabilityTime"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
                placeholder="Ex: after 5pm, between 11am-5pm"
              />
            </div>
          </div>
        </div>
        <div>
          <AudioVideo onFilesChange={handleFilesChange} />
        </div>

        <div className="flex space-x-4 p-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#A06FFF] text-white rounded-md hover:bg-[#473965]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandlordForm;
