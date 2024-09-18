// src/pages/SingleProperty.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailedViewPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/properties/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading property: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      {property ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Section: Images */}
          {/* <div className="space-y-4">
            {property.images && property.images.length > 0 ? (
              property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div> */}

<div className="space-y-4">
  
  {['/images/room.jpg', '/images/room2.jpg', '/images/room3.jpg'].map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Static Image ${index + 1}`}
      className="w-full h-64 object-cover rounded-lg shadow-lg"
    />
  ))}
</div>


          {/* Right Section: Property Details */}
          <div className="space-y-4">
            {/* <h1 className="text-2xl font-bold">{property.category}</h1> */}
            <p className="text-lg">
              <strong>Description:</strong>{" "}
              {property.description || "No description available"}
            </p>
            <p className="text-lg">
              <strong>Location:</strong> {property.locationCity}, {property.streetNumber}
            </p>
            <p className="text-lg">
              <strong>Bedrooms:</strong> {property.numOfBedrooms}
            </p>
            <p className="text-lg">
              <strong>Bathrooms:</strong> {property.numOfBathrooms}
            </p>
            <p className="text-lg">
              <strong>Living Rooms:</strong> {property.numOfLivingRooms}
            </p>
            <p className="text-lg">
              <strong>Kitchens:</strong> {property.numOfKitchens}
            </p>
            <p className="text-lg">
              <strong>Monthly Rent:</strong> ${property.monthlyRent}
            </p>
            <p className="text-lg">
              <strong>Advanced Rent:</strong> ${property.advancedRent}
            </p>
            <p className="text-lg">
  <strong>Facilities:</strong> {property.facilities && Array.isArray(property.facilities) ? property.facilities.join(", ") : "No facilities listed"}
</p>

            <p className="text-lg">
              <strong>House Rules:</strong> {property.houseRule}
            </p>
           
            <Link
              to="/edit-profile"
              className="text-blue-500 hover:underline"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      ) : (
        <div>No property found</div>
      )}
    </div>
  );
};

export default DetailedViewPage;
