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
    dimensions: {
      bedrooms: [],
      kitchens: [],
      livingrooms: [],
    },
    dimensions: {
      bedrooms: [],
      kitchens: [],
      livingrooms: [],
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
    console.log(name, value);
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleDimensionChange = (e, index, type, dimensionType) => {
  //   const { value } = e.target;
  //   setFormData((prevData) => {
  //     const updatedDimensions = [...prevData.dimensions[type]];
  //     if (!updatedDimensions[index])
  //       updatedDimensions[index] = { length: "", breadth: "" };
  //     updatedDimensions[index][dimensionType] = value;
  //     console.log("Updated dimensions:", updatedDimensions);
  //     return {
  //       ...prevData,
  //       dimensions: {
  //         ...prevData.dimensions,
  //         [type]: updatedDimensions,
  //       },
  //     };
  //   });
  // };

  const handleDimensionChange = (e, index, type, dimensionType) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedDimensions = [...prevData.dimensions[type]]; // Make a copy of the current dimensions array for the specified room type
      
      // Ensure the index exists in the array, otherwise initialize it
      if (!updatedDimensions[index]) {
        updatedDimensions[index] = { length: "", breadth: "" };
      }
  
      // Update the appropriate dimension (length or breadth)
      updatedDimensions[index][dimensionType] = value;
  
      console.log("Updated dimensions:", updatedDimensions);
      return {
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [type]: updatedDimensions, // Update the state with the modified room dimensions
        },
      };
    });
  };
  

  const renderDimensionFields = (count, type) => {
    const fields = [];
    for (let i = 0; i < count; i++) {
      fields.push(
        <div key={`${type}-${i}`} className="mb-2">
          <label className=" block mb-2 font-medium text-[#9747FF]">
            {type.charAt(0).toUpperCase() + type.slice(1)} {i + 1}{" "}
            Dimensions(inch)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Length"
              className=" rounded-md p-2 w-1/2"
              value={formData.dimensions[type][i]?.length || ""}
              onChange={(e) => handleDimensionChange(e, i, type, "length")}
            />
            <input
              type="number"
              placeholder="Breadth"
              className=" rounded-md p-2 w-1/2"
              value={formData.dimensions[type][i]?.breadth || ""}
              onChange={(e) => handleDimensionChange(e, i, type, "breadth")}
            />
          </div>
          <div className="mt-1 text-sm text-gray-600">
            Preview: Length = {formData.dimensions[type][i]?.length || "N/A"}{" "}
            inch, Breadth = {formData.dimensions[type][i]?.breadth || "N/A"}{" "}
            inch
          </div>
        </div>
      );
    }
    return fields;
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

  const handleRoomDimensionsChange = (name, value) => {
    console.log(
      "Room Dimension Change from landlord form - Name:",
      name,
      "Value:",
      value
    );
    console.log(
      "Room Dimension Change from landlord form - Name:",
      name,
      "Value:",
      value
    );
    // You can also update your formData or room data here if necessary
  };

  const handleSubmit = async (event) => {
    console.log("formData", formData);
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

    const dimensionsData = {
      bedrooms: formData.dimensions.bedrooms.map((bedroom) => ({
        length: +bedroom.length,
        breadth: +bedroom.breadth,
      })),
      kitchens: formData.dimensions.kitchens.map((kitchen) => ({
        length:+kitchen.length,
        breadth:+kitchen.breadth,
      })),
      livingrooms: formData.dimensions.livingrooms.map((livingroom) => ({
        length: +livingroom.length,
        breadth: +livingroom.breadth,
      })),
    };

    // Add dimensionsData to FormData
    console.log("formData.dimensions", formData.dimensions);
    console.log("dimensionsData", dimensionsData);
    
    console.log(dimensionsData, 'dimensions Data')

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
    propertyData.append("dimensions", JSON.stringify(dimensionsData));
    propertyData.append("floor", formData.floor);
    propertyData.append("StreetName", formData.StreetName);
    propertyData.append("entityType", "property");
    propertyData.append("numOfBathrooms", formData.numOfBathrooms);

    propertyData.append("availableStart", formData.availableStart);
    propertyData.append("availableEnd", formData.availableEnd);

    propertyData.append("availabilityTime", formData.availabilityTime);
 
console.log(propertyData, 'asdfadaaaa ')
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
  

    console.log(propertyData, 'fasdfas928347938')
    try {
      const response = await axios.post(
        "http://localhost:5001/properties",
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
        // navigate("/");
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
          onChange={handleChange}
          onChange={handleChange}
          onRoomDimensionsChange={handleRoomDimensionsChange}
        />

        <div className="grid grid-cols-2 gap-x-4 px-4  ">
          <div className="">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bedrooms
              <span className="text-red-600 text-[20px] ml-1"> *</span>
            </label>
            <input
              type="number"
              name="numOfBedrooms"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfBedrooms}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfBedrooms || 0}
            </div>
            {formData.numOfBedrooms > 0 &&
              renderDimensionFields(+formData.numOfBedrooms, "bedrooms")}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Kitchens
              <span className="text-red-600 text-[20px] ml-1"> *</span>
            </label>
            <input
              type="number"
              name="numOfKitchens"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfKitchens}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfKitchens || 0}
            </div>
            {formData.numOfKitchens > 0 &&
              renderDimensionFields(+formData.numOfKitchens, "kitchens")}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Living Rooms
            </label>
            <input
              type="number"
              name="numOfLivingRooms"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfLivingRooms}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfLivingRooms || 0}
            </div>
            {formData.numOfKitchens > 0 &&
              renderDimensionFields(+formData.numOfLivingRooms, "livingrooms")}
          </div>
        </div>


        <div className="grid grid-cols-2 gap-x-4 px-4  ">
          <div className="">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Bedrooms
              <span className="text-red-600 text-[20px] ml-1"> *</span>
            </label>
            <input
              type="number"
              name="numOfBedrooms"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfBedrooms}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfBedrooms || 0}
            </div>
            {formData.numOfBedrooms > 0 &&
              renderDimensionFields(+formData.numOfBedrooms, "bedrooms")}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Kitchens
              <span className="text-red-600 text-[20px] ml-1"> *</span>
            </label>
            <input
              type="number"
              name="numOfKitchens"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfKitchens}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfKitchens || 0}
            </div>
            {formData.numOfKitchens > 0 &&
              renderDimensionFields(+formData.numOfKitchens, "kitchens")}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-[#9747FF]">
              Number of Living Rooms
            </label>
            <input
              type="number"
              name="numOfLivingRooms"
              min={0}
              className=" w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.numOfLivingRooms}
              onChange={handleInputChange}
            />
            <div className="mt-1 text-sm text-gray-600">
              Preview: {formData.numOfLivingRooms || 0}
            </div>
            {formData.numOfKitchens > 0 &&
              renderDimensionFields(+formData.numOfLivingRooms, "livingrooms")}
          </div>
        </div>

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
