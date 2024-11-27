import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AudioVideo from "../../components/landlord/AudioVideo";
import Cookies from "js-cookie";
import { RiArrowDownSLine } from "react-icons/ri";

const VehicleForm = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    capacity: "",
    registrationNumber: "",
    pricingPerHour: "",
    vehicleLocation: "",
    vehicleFeatures: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const startDate = new Date(formData.availableStart);
    const endDate = new Date(formData.availableEnd);

    if (endDate < startDate) {
      alert("Availability End date cannot be before Availability Start date.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one image .");
      return;
    }

    const vehicleData = new FormData();
    vehicleData.append("type", formData.type);
    vehicleData.append("capacity", formData.capacity);
    vehicleData.append("registrationNumber", formData.registrationNumber);
    vehicleData.append("vehicleFeatures", formData.vehicleFeatures);
    vehicleData.append("vehicleLocation", formData.vehicleLocation);
    vehicleData.append("availableStart", formData.availableStart);
    vehicleData.append("availableEnd", formData.availableEnd);
    vehicleData.append("pricingPerHour", formData.pricingPerHour);
    vehicleData.append("availabilityTime", formData.availabilityTime);
    vehicleData.append("entityType", "vehicle");

    // Append images and videos to FormData
    images.forEach((image) => {
      vehicleData.append("vehicleImage", image);
    });
    videos.forEach((video) => {
      vehicleData.append("vehicleVideo", video);
    });

    const token = Cookies.get("token");
    console.log("Token before submission:", token);

    console.log("Vehicle Data contents:");
    vehicleData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post(
        "http://localhost:3002/vehicle",
        vehicleData,
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
        alert("Vehicle posted successfully!");
      }
    } catch (error) {
      console.error(
        "Error posting vehicle:",
        error.response?.data || error.message
      );
      alert("Failed to post vehicle. Please try again.");
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
        <div>
          <h2 className="text-lg font-medium  ">Vehicle Details</h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Vehicle Type
                <span className="text-red-600 text-[20px] ml-1"> *</span>
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none"
                >
                  <option value="" className=""></option>
                  <option value="flat">Van</option>
                  <option value="room">Truck</option>
                  <option value="apartment">Jeep</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <RiArrowDownSLine className="h-5 w-5 text-black" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Vehicle Capacity(in tons)
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Vehicle Registration Number
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="text"
                name="registrationNumber"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mt-9 ">
            Pricing,Features & Location
          </h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Pricing Per Hour
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="number"
                name="pricingPerHour"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Vehicle Location
                <span className="text-red-600 ml-1 text-[20px]">*</span>
              </label>
              <input
                type="text"
                name="vehicleLocation"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-[#9747FF]">
            Vehicle Features
          </label>
          <textarea
            className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 resize-none"
            rows="3"
            name="vehicleFeatures"
            onChange={handleInputChange}
            placeholder="Add vehicle features"
          ></textarea>
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

        <div className="flex space-x-4 ">
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

export default VehicleForm;
