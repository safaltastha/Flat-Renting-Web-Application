import React, { useState } from "react";
import { TextField } from "@mui/material";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AudioVideo from "../../components/landlord/AudioVideo";
import Availability from "../../components/Availability";

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    capacity: "",
    registrationNumber: "",
    pricingPerHour: "",
    vehicleLocation: "",
    vehicleFeatures: "",
    availableStart: null,
    availableEnd: null,
  });

  const validationSchema = Yup.object({
    type: Yup.string().required("Vehicle Type is required"),
    capacity: Yup.number()
      .typeError("Capacity must be a number")
      .required("Vehicle Capacity is required"),
    registrationNumber: Yup.string().required(
      "Registration Number is required"
    ),
    availableStart: Yup.date().required("Available Start time is required"),
    availableEnd: Yup.date().required("Available End time is required"),
    pricingPerHour: Yup.number()
      .typeError("Pricing must be a valid number")
      .required("Pricing is required")
      .positive("Pricing must be a positive number")
      .min(1, "Pricing must be greater than or equal to 1"),
    vehicleFeatures: Yup.string()
      .nullable()
      .max(500, "Features description is too long")
      .optional(),
    vehicleLocation: Yup.string().required("Vehicle location is required"),
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    const vehicleData = new FormData();

    // Append formData to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        vehicleData.append(key, value);
      }
    });

    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "http://localhost:3001/vehicle",
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
        alert("Vehicle posted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error posting vehicle:",
        error.response?.data || error.message
      );
      alert("Failed to post vehicle. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-custom-gray shadow-lg rounded-lg my-12">
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Vehicle Details Section */}
            <h2 className="text-lg font-medium  ">Vehicle Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Vehicle Type Field */}
              <div className="flex flex-col">
                <label className="block mb-2 font-medium text-[#9747FF]">
                  Vehicle Type
                  <span className="text-red-600 text-[20px] ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="type"
                    required
                    onChange={handleChange}
                    value={formData.type}
                    className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Truck">Truck</option>
                    <option value="Car">Car</option>
                    <option value="Jeep">Jeep</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <RiArrowDownSLine className="h-5 w-5 text-black" />
                  </div>
                </div>
              </div>

              {/* Vehicle Capacity Field */}
              <div className="flex flex-col">
                <label className="block mb-2 font-medium text-[#9747FF]">
                  Vehicle Capacity (in tons)
                  <span className="text-red-600 ml-1 text-[20px]">*</span>
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Ex: 5"
                />
                <ErrorMessage
                  name="capacity"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Vehicle Registration Number Field */}
              <div className="flex flex-col">
                <label className="block mb-2 font-medium text-[#9747FF]">
                  Vehicle Registration Number
                  <span className="text-red-600 ml-1 text-[20px]">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Ex: ABC-1234"
                />
                <ErrorMessage
                  name="registrationNumber"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <Availability
              formData={formData}
              handleDateChange={handleDateChange}
              errors={errors}
            />

            <h2 className="text-lg font-medium  ">
              Pricing, Features & Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
              {/* Pricing Per Hour */}
              <div className="flex flex-col">
                <label className="block mb-2 font-medium text-[#9747FF]">
                  Pricing per Hour
                  <span className="text-red-600 ml-1 text-[20px]">*</span>
                </label>
                <input
                  type="number"
                  name="pricingPerHour"
                  value={formData.pricingPerHour}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Ex: 500"
                />
                <ErrorMessage
                  name="pricingPerHour"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Vehicle Location */}
              <div className="flex flex-col">
                <label className="block mb-2 font-medium text-[#9747FF]">
                  Vehicle Location
                  <span className="text-red-600 ml-1 text-[20px]">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleLocation"
                  value={formData.vehicleLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Ex: Ranipauwa"
                />
                <ErrorMessage
                  name="vehicleLocation"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            {/* Vehicle Features */}
            <div className="flex flex-col">
              <label className="block mb-2 font-medium text-[#9747FF]">
                Vehicle Features
              </label>
              <textarea
                name="vehicleFeatures"
                value={formData.vehicleFeatures}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border-0 rounded-md focus:outline-none focus:ring focus:border-blue-500 resize-none"
                rows="3"
                placeholder="Add vehicle features"
              />
              <ErrorMessage
                name="vehicleFeatures"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <AudioVideo />

            {/* Submit and Cancel Buttons */}
            <div className=" mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 disabled:bg-gray-300"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehicleForm;
