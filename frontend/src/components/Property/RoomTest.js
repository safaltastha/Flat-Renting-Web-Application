import React, { useState } from "react";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    numOfSpaces: "",
    numOfBedrooms: "",
    numOfKitchens: "",
    dimensions: {
      livingrooms: [],
      bedrooms: [],
      kitchens: [],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDimensionChange = (e, index, type, dimensionType) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedDimensions = [...prevData.dimensions[type]];
      if (!updatedDimensions[index])
        updatedDimensions[index] = { length: "", breadth: "" };
      updatedDimensions[index][dimensionType] = value;
      return {
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [type]: updatedDimensions,
        },
      };
    });
  };

  const renderDimensionFields = (count, type) => {
    const fields = [];
    for (let i = 0; i < count; i++) {
      fields.push(
        <div key={`${type}-${i}`} className="mb-2">
          <label className="block mb-1">
            {type.charAt(0).toUpperCase() + type.slice(1)} {i + 1} Dimensions
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Length"
              className="border border-gray-300 rounded p-2 w-1/2"
              value={formData.dimensions[type][i]?.length || ""}
              onChange={(e) => handleDimensionChange(e, i, type, "length")}
            />
            <input
              type="number"
              placeholder="Breadth"
              className="border border-gray-300 rounded p-2 w-1/2"
              value={formData.dimensions[type][i]?.breadth || ""}
              onChange={(e) => handleDimensionChange(e, i, type, "breadth")}
            />
          </div>
          <div className="mt-1 text-sm text-gray-600">
            Preview: Length = {formData.dimensions[type][i]?.length || "N/A"}{" "}
            ft, Breadth = {formData.dimensions[type][i]?.breadth || "N/A"} ft
          </div>
        </div>
      );
    }
    return fields;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Submit this to the backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border rounded"
    >
      <div className="mb-4">
        <label className="block mb-1">Property Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter property category"
          className="border border-gray-300 rounded p-2 w-full"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Number of LivingRooms</label>
        <input
          type="number"
          name="numOfLivingRooms"
          placeholder="Enter number of spaces"
          className="border border-gray-300 rounded p-2 w-full"
          value={formData.numOfLivingRooms}
          onChange={handleChange}
        />
        {formData.numOfLivingRooms > 0 &&
          renderDimensionFields(+formData.numOfLivingRooms, "livingrooms")}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Number of Bedrooms</label>
        <input
          type="number"
          name="numOfBedrooms"
          placeholder="Enter number of bedrooms"
          className="border border-gray-300 rounded p-2 w-full"
          value={formData.numOfBedrooms}
          onChange={handleChange}
        />
        {formData.numOfBedrooms > 0 &&
          renderDimensionFields(+formData.numOfBedrooms, "bedrooms")}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Number of Kitchens</label>
        <input
          type="number"
          name="numOfKitchens"
          placeholder="Enter number of kitchens"
          className="border border-gray-300 rounded p-2 w-full"
          value={formData.numOfKitchens}
          onChange={handleChange}
        />
        {formData.numOfKitchens > 0 &&
          renderDimensionFields(+formData.numOfKitchens, "kitchens")}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
