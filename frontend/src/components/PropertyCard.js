// src/components/PropertyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <h2>{property.category}</h2>
            <p><strong>Location:</strong> {property.locationCity}</p>
            <p><strong>Bedrooms:</strong> {property.numOfBedrooms}</p>
            <p><strong>Monthly Rent:</strong> ${property.monthlyRent}</p>
            <Link to={`/properties/${property.id}`}>View Details</Link>
        </div>
    );
};

export default PropertyCard;
