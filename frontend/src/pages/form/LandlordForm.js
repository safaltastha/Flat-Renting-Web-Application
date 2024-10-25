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
    features: {
      electricity: false,
      parking: false,
      wifi: false,
      petAllowed: false,
    },
    floor: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (images.length === 0 ) {
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
    propertyData.append("category", formData.category);
    propertyData.append("locationCity", formData.locationCity);
    propertyData.append("locationStreetNumber", formData.locationStreetNumber);
    propertyData.append("numOfSpaces", formData.numOfSpaces);
    propertyData.append("numOfBedrooms", formData.numOfBedrooms);
    propertyData.append("numOfLivingrooms", formData.numOfLivingRooms);
    propertyData.append("numOfKitchens", formData.numOfKitchens);
    propertyData.append("monthlyRent", formData.monthlyRent);
    propertyData.append("advancedRent", formData.advancedRent);
    propertyData.append("description", formData.description);
    propertyData.append("houseRule", formData.houseRule);
    propertyData.append("features", JSON.stringify(featuresData));
    propertyData.append("floor", formData.floor);
    propertyData.append("StreetName", formData.StreetName);

    // Append images and videos to FormData
    images.forEach((image) => {
      propertyData.append("image", image);
    });
    videos.forEach((video) => {
      propertyData.append("video", video);
    });

    const token = Cookies.get("token");
    console.log("Token before submission:", token);

    try {
      const response = await axios.post(
        "http://localhost:3001/properties",
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
        alert("Property posted successfully!");
        navigate("/");
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-custom-gray shadow-lg rounded-lg my-12">
      <form className="space-y-6" method="post" onSubmit={handleSubmit}>
        <LocationField
          capitalizeWords={capitalizeWords}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <GeneralCategory onChange={handleChange} />
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
          <h2 className="text-lg font-medium mb-2">Photos and Videos</h2>
          <AudioVideo onFilesChange={handleFilesChange} />
        </div>

        <div className="flex space-x-4 p-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
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
