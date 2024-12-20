import React, { useEffect, useState } from "react";
import PropertyCard from "../components/Property/PropertyCard";
import axios from "axios";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3001/properties");
        console.log(response.data);
        setProperties(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties: {error.message}</div>;

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={property.id === selectedCardId}
              onClick={() => handleCardClick(property.id)}
            />
          ))
        ) : (
          <div>This is listing ,No properties available</div>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
