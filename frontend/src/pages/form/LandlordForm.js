import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import GeneralCategory from "../landlord/GeneralCategory";
import LocationField from "../landlord/LocationField";
import Rent from "../landlord/Rent";
import DescriptionAndRules from "../landlord/DescriptionAndRules";
import AudioVideo from "../landlord/AudioVideo";
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
    monthlyRent: "",
    description: "",
    houseRule: "",
    facilities: {
      electricity: false,
      parking: false,
      wifi: false,
      petAllowed: false,
    },
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
      facilities: {
        ...prev.facilities,
        [name]: checked, // Update the specific facility's value
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (images.length === 0 || videos.length === 0) {
      alert("Please upload at least one image and one video.");
      return;
    }

    // Create a FormData object to handle the file uploads
    const testData = new FormData();
    testData.append("category", formData.category);
    testData.append("locationCity", formData.locationCity);
    testData.append("locationStreetNumber", formData.locationStreetNumber);
    testData.append("numOfSpaces", formData.numOfSpaces);
    testData.append("numOfBedrooms", formData.numOfBedrooms);
    testData.append("monthlyRent", formData.monthlyRent);
    testData.append("description", formData.description);
    testData.append("houseRule", formData.houseRule);
    testData.append("features", JSON.stringify(formData.facilities)); // Append facilities as JSON string

    // Append images and videos to FormData
    images.forEach((image) => {
      testData.append("photo", image);
    });
    videos.forEach((video) => {
      testData.append("video", video);
    });

    const token = Cookies.get("token");
    console.log("Token before submission:", token);

    try {
      const response = await axios.postForm(
        "http://localhost:3001/properties",
        testData,
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
              />
              <span className="mr-2 text-[#777777]">Electricity</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="parking"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2 text-[#777777]">Parking</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="wifi"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="mr-2 text-[#777777]">WiFi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="petAllowed"
                className="text-blue-600 form-checkbox"
                onChange={handleCheckboxChange}
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
