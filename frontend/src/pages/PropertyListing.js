import React, { useEffect, useState } from "react";
import PropertyCard from "../components/Property/PropertyCard";
import { useLocation } from "react-router-dom";


const PropertyListing = () => {
  const location = useLocation();

  const properties = location.state?.properties || [];
  console.log(properties, 'image')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
