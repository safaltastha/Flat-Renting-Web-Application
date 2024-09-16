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
    <div className="">
      {property ? (
        <div className="">
          <h1>{property.category}</h1>
          <p>
            <strong>Location:</strong> {property.locationCity}
          </p>
          <p>
            <strong>Bedrooms:</strong> {property.numOfBedrooms}
          </p>
          <p>
            <strong>Monthly Rent:</strong> ${property.monthlyRent}
          </p>
          <p>
            <strong>Advancedy Rent:</strong> ${property.advancedRent}
          </p> 
          <Link to="/edit-profile">edit Profile</Link>
          <p>
            <strong>Description:</strong>{" "}
            {property.description || "No description available"}
          </p>
        </div>
      ) : (
        <div>No property found</div>
      )}
    </div>
  );
};

export default DetailedViewPage;
