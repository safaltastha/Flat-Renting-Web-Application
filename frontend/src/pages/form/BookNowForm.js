import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleTimeForm = ({ onChange, formData }) => {
  return (
    <div className="mt-5">
      {/* Vehicle time form components */}
      <label htmlFor="pickup-location" className="block text-gray-600">
        Pick-up Location:<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="pickup-location"
        name="pickup_location"
        value={formData.pickup_location}
        placeholder="Enter pick-up location"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label htmlFor="dropoff-location" className="block text-gray-600">
        Drop-off Location:<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="dropoff_location"
        name="dropoff_location"
        value={formData.dropoff_location}
        placeholder="Enter drop-off location"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      {/* Date and time input */}
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

      <label htmlFor="vehicleDuration" className="block text-gray-600">
        Duration (in hours):<span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        id="vehicle_duration"
        name="vehicle_duration"
        min="1"
        value={formData.vehicle_duration}
        placeholder="Enter duration in hours"
        onChange={onChange}
        className="border w-full mt-2 mb-4 px-3 py-2 rounded-md bg-white"
      />

      <label className="block text-gray-600">
        Do you need personnel for shifting?
      </label>
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
          <label htmlFor="personnel-yes" className="text-gray-700">
            Yes
          </label>
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
          <label htmlFor="personnelno" className="text-gray-700">
            No
          </label>
        </div>
      </div>

      {formData.personnel === "yes" && (
        <>
          <label htmlFor="num_personnel" className="block text-gray-600">
            Number of Personnel:<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="num_personnel"
            name="num_personnel"
            value={formData.num_personnel}
            min="1"
            placeholder="Enter number of personnel"
            onChange={onChange}
            className="w-full mt-2 mb-4 p-2 border rounded bg-white"
          />

          <label htmlFor="personnel-duration" className="block text-gray-600">
            For how long will you need personnel (in hours)?
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="personnel_duration"
            name="personnel_duration"
            value={formData.personnel_duration}
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
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    pickup_location: "",
    dropoff_location: "",
    date: "",
    time: "",
    vehicle_duration: "",
    requires_personnel: "",
    num_Personnel: "",
    personnel_duration: "",
    booking: "",
    vehicleChosen: false,
    vehicleDetails: null,
    selectedProperty: null,
  });

  useEffect(() => {
    const vehicleData = JSON.parse(localStorage.getItem("selectedVehicle"));

    if (vehicleData) {
      setFormData((prevData) => ({
        ...prevData,
        booking: "yes",
        vehicleChosen: true,
        vehicleDetails: vehicleData,
      }));
    }

    const property = JSON.parse(localStorage.getItem("selectedProperty"));

    if (property) {
      setFormData((prevData) => ({
        ...prevData,
        selectedProperty: property,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello", formData);
  };

  const handleVehicleBooking = () => {
    navigate("/vehicles");
  };

  const handleCancelBooking = () => {
    localStorage.removeItem("selectedVehicle");
    navigate("/");
  };

  const handleConfirmBooking = async () => {
    const payload = {
      vehicleBooking: {
        pickup_location: formData.pickup_location,
        dropoff_location: formData.dropoff_location,
        date: formData.date,
        time: formData.time,
        vehicle_duration: formData.vehicle_duration,
      },
    };

    if (formData.booking === "yes" && formData.vehicleChosen) {
      payload.vehicleBooking.vehicleDetails = formData.vehicleDetails;
    }

    if (formData.personnel === "yes") {
      payload.personnel = {
        num_Personnel: formData.num_Personnel,
        personnel_duration: formData.personnel_duration,
      };
    }

    // Add the selected property information to the payload
    if (formData.selectedProperty) {
      payload.property = formData.selectedProperty; // Include selected property data
    }

    // Log the payload data before sending it
    console.log("Payload being sent to the backend:", formData);

    const formattedData = {
      propertyId: formData.selectedProperty.id,
      isVehicleBooked: formData.booking === "yes" ? true : false,
      vehicleId: formData.vehicleDetails.id,
      pickupLocation: formData.pickup_location,
      dropoffLocation: formData.dropoff_location,
      vehicleDate: formData.date,
      vehicleTime: formData.time,
      vehicleDuration: +formData.vehicle_duration,
      requiresPersonnel: formData.requires_personnel === "yes" ? true : false,
      numPersonnel: +formData.num_Personnel,
      personnelDuration: +formData.personnel_duration,
    };

    try {
      const response = await axios.post(
        `http://localhost:3002/booking`,
        formattedData,
        {
          withCredentials: true,
        }
      );
      console.log("Booking Successful:", response.data);
      localStorage.removeItem("selectedVehicle");
      localStorage.removeItem("selectedProperty");
      navigate("/");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EEE5FF] py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border border-gray-300 bg-white rounded-md shadow-lg"
      >
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-xl font-semibold text-purple-600">
            Please fill this form
          </h1>
          <RiCloseLine
            className="absolute right-0 text-2xl cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={handleCancelBooking}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Will you be booking a vehicle?
          </label>
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
              <label htmlFor="vehicle-yes" className="text-gray-700">
                Yes
              </label>
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
              <label htmlFor="vehicle-no" className="text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>

        {formData.vehicleChosen && formData.vehicleDetails && (
          <div className="mb-4 p-4 bg-purple-100 border-2 border-purple-600 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-purple-800">
              Your Chosen Vehicle
            </h3>
            <p className="text-gray-700">
              Vehicle Type:{" "}
              <span className="text-lg text-purple-600">
                {formData.vehicleDetails.type}
              </span>
            </p>
            <p className="text-gray-700">
              Pricing:{" "}
              <span className="text-lg text-purple-600">
                Nrs.{formData.vehicleDetails.pricingPerHour}/hour
              </span>
            </p>
          </div>
        )}

        {formData.booking === "yes" && !formData.vehicleChosen && (
          <div>
            <button
              type="button"
              onClick={handleVehicleBooking}
              className="w-full mt-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
            >
              Choose vehicle
            </button>
            <VehicleTimeForm onChange={handleChange} formData={formData} />
          </div>
        )}

        {formData.vehicleChosen && (
          <div className="mt-4">
            <VehicleTimeForm onChange={handleChange} formData={formData} />
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCancelBooking}
            className="w-full mt-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Cancel Booking
          </button>
          <button
            type="button"
            onClick={handleConfirmBooking}
            className="w-full mt-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookNowWithVehicleForm;
