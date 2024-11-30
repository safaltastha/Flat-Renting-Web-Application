import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImLocation2, ImPhone, ImMail } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useVehicle } from "../../context/VehicleContext";

const VehicleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const { setSelectedVehicle } = useVehicle(); // Access context

  const handleBookNow = () => {
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
    navigate("/bookproperty"); // Navigate to booking formcd 
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `http://localhost:3001/vehicle/${id}`,
          { withCredentials: true }
        );

        setVehicle(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vehicle: {error.message}</div>;

  return (
    <div className="container max-w-[1600px] px-36 mt-8">
      <p className="text-3xl font-semibold text-[#9747FF] ">
        {vehicle.type} for rent in {vehicle.vehicleLocation}
      </p>

      {vehicle ? (
        <div className="flex mt-6 flex-wrap gap-8">
          {/* Left Section: Images, Property Details, and Map */}
          <div className="flex-1 space-y-6">
            {/* Large Image */}
            {vehicle.media?.length > 0 && (
              <img
                src={vehicle.media[0].file_path}
                alt="Large vehicle Image"
                className="w-full h-[600px] object-cover rounded-md shadow-lg"
              />
            )}

            {/* Vehicle Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg mt-4 ">
              <div className="space-y-3 text-gray-700">
                <p className="text-lg">
                  <strong>Vehicle Registration Number:</strong>{" "}
                  {vehicle.registrationNumber}
                </p>
                <p className="text-lg">
                  <strong>Vehicle Capacity:</strong> {vehicle.capacity} tons
                </p>
                <p className="text-lg">
                  <strong>Pricing:</strong> Nrs {vehicle.pricingPerHour}/hour
                </p>
                <p className="text-lg">
                  <strong>Location:</strong> {vehicle.vehicleLocation}
                </p>
                <p className="text-lg">
                  <strong>Vehicle Features:</strong> {vehicle.vehicleFeatures}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#9747FF] hover:bg-[#7735CC] transition-colors duration-300 px-20 py-3 rounded-md text-white text-lg font-semibold mt-6 shadow-lg"
                  onClick={handleBookNow}
                >
                  Confirm vehicle
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="my-12">
              <p className="text-2xl font-semibold">Find the vehicle on map</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28129.0477250726!2d83.98528161614638!3d28.203342149521294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1727537868376!5m2!1sen!2snp"
                width="600"
                height="300"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Section: Smaller Images and Contact Info */}
          <div className="w-[30%] sticky top-0">
            {/* Smaller Images */}
            <div className="flex flex-col space-y-2">
              {vehicle.media?.slice(1, 3).map((image, index) => (
                <img
                  key={index}
                  src={image.file_path}
                  alt={`Small Image ${index + 1}`}
                  className="w-full h-[300px] object-cover rounded-md shadow-lg"
                />
              ))}

              {/* Button to show all images */}
              <button
                className="text-[#9747FF] mt-2 underline text-xl"
                onClick={() => setShowAllImages(!showAllImages)}
              >
                {showAllImages ? "Show Less" : "Show More Images"}
              </button>

              {/* If showAllImages is true, display additional images */}
              {showAllImages &&
                vehicle.media
                  .slice(3)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image.file_path}
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
              <p className="text-2xl font-semibold">Contact Information</p>
              <div className="flex items-center">
                <FaUserCircle className="mr-3 text-xl" />
                <span className="text-lg">John Doe</span>
              </div>
              <div className="flex items-center">
                <ImPhone className="mr-3 text-xl" />
                <span className="text-lg">+977-9800000000</span>
              </div>
              <div className="flex items-center">
                <ImLocation2 className="mr-3 text-xl" />
                <span className="text-lg">
                  Street 9, Janapriya Marga, Nayabazar
                </span>
              </div>
              <div className="flex items-center">
                <ImMail className="mr-3 text-xl" />
                <span className="text-lg">landlord@example.com</span>
              </div>
              <div className="text-lg font-semibold text-red-500">
                Availability Time: {vehicle.availabilityTime}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No vehicle found</div>
      )}
    </div>
  );
};

export default VehicleDetailPage;
