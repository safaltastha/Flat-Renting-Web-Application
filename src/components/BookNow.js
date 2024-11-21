import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const VehicleTimeForm = ({ onChange, formData }) => {
  return (
    <div className="mt-5">
      <label htmlFor="vehicle-type" className="block text-gray-600">
        Choose the type of vehicle:<span className="text-red-500">*</span>
      </label>
      <select
        id="vehicle-type"
        name="vehicleType"
        value={formData.vehicleType}
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      >
        <option value="truck">Truck</option>
        <option value="van">Van</option>
      </select>

      <label htmlFor="pickup-location" className="block text-gray-600">
        Pick-up Location:<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="pickup-location"
        name="pickupLocation"
        value={formData.pickupLocation}
        placeholder="Enter pick-up location"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label htmlFor="dropoff-location" className="block text-gray-600">
        Drop-off Location:<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="dropoff-location"
        name="dropoffLocation"
        value={formData.dropoffLocation}
        placeholder="Enter drop-off location"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label htmlFor="date" className="block text-gray-600">
        Please choose date and time:<span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />
      <label htmlFor="time" className="block text-gray-600">
        Time:
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={formData.time}
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label htmlFor="duration" className="block text-gray-600">
        Duration (in hours):<span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        id="duration"
        name="duration"
        min="1"
        value={formData.duration}
        placeholder="Enter duration in hours"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label className="block text-gray-600">Do you need personnel for shifting?</label>
      <div className="flex space-x-4 mt-2 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="personnel-yes"
            name="personnel"
            value="yes"
            checked={formData.personnel === "yes"}
            onChange={onChange}
            className="mr-2"
          />
          <label htmlFor="personnel-yes" className="text-gray-700">Yes</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="personnel-no"
            name="personnel"
            value="no"
            checked={formData.personnel === "no"}
            onChange={onChange}
            className="mr-2"
          />
          <label htmlFor="personnel-no" className="text-gray-700">No</label>
        </div>
      </div>

      {formData.personnel === "yes" && (
        <>
          <label htmlFor="num-personnel" className="block text-gray-600">
            Number of Personnel:<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="num-personnel"
            name="numPersonnel"
            value={formData.numPersonnel}
            min="1"
            placeholder="Enter number of personnel"
            onChange={onChange}
            className="w-full mt-2 mb-4 p-2 border rounded bg-white"
          />
          
          <label htmlFor="personnel-duration" className="block text-gray-600">
            For how long will you need personnel (in hours)?<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="personnel-duration"
            name="personnelDuration"
            value={formData.personnelDuration}
            min="1"
            placeholder="Enter duration for personnel in hours"
            onChange={onChange}
            className="w-full mt-2 mb-4 p-2 border rounded bg-white"
          />
        </>
      )}
    </div>
  );
};

const BookNowWithVehicleForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    booking: "",
    vehicleType: "truck",
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    duration: "",
    personnel: "",
    numPersonnel: "",
    personnelDuration: "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EEE5FF] py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border border-gray-300 bg-white rounded-md shadow-lg"
      >
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl font-semibold text-purple-600">Please fill this form</h1>
          <RiCloseLine className="absolute right-0 text-2xl cursor-pointer text-gray-400 hover:text-gray-600" />
        </div>

        <div className="mt-3">
          <label htmlFor="first-name" className="block text-gray-600">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border w-full mt-1 px-3 py-2 rounded-md bg-gray-50"
            placeholder="John"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="last-name" className="block text-gray-600">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border w-full mt-1 px-3 py-2 rounded-md bg-gray-50"
            placeholder="Doe"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="email" className="block text-gray-600">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full mt-1 px-3 py-2 rounded-md bg-gray-50"
            placeholder="abc12@gmail.com"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="phone-number" className="block text-gray-600">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone-number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border w-full mt-1 px-3 py-2 rounded-md bg-gray-50"
            placeholder="98********"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">Will you be booking a vehicle?</label>
          <div className="flex space-x-4 mt-2 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="vehicle-yes"
                name="booking"
                value="yes"
                checked={formData.booking === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="vehicle-yes" className="text-gray-700">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="vehicle-no"
                name="booking"
                value="no"
                checked={formData.booking === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="vehicle-no" className="text-gray-700">No</label>
            </div>
          </div>
        </div>

        {formData.booking === "yes" && (
          <VehicleTimeForm onChange={handleChange} formData={formData} />
        )}

        <button
          type="submit"
          className="w-full mt-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookNowWithVehicleForm;
