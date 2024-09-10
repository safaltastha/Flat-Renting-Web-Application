// src/components/PropertyCard.js
import React from 'react';


const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <h2>{property.category}</h2>
            <p><strong>Location:</strong> {property.locationCity}</p>
            <p><strong>Bedrooms:</strong> {property.numOfBedrooms}</p>
            <p><strong>Monthly Rent:</strong> ${property.monthlyRent}</p>
            <p><strong>Description:</strong> {property.description || 'No description available'}</p>
        </div>
    );
};

export default PropertyCard;
