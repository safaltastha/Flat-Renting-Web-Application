// src/pages/PropertyListing.js
import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import axios from 'axios';


const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const loadProperties = async () => {
           axios.get("http://localhost:3001/properties").then((response)=>{
            setProperties(response.data);

           })
            
        };

        loadProperties();
    }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error loading properties: {error.message}</div>;

    return (
        <div className="property-listing">
            <h1>Property Listings</h1>
            <div className="property-list">
                {properties.length > 0 ? (
                    properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                ) : (
                    <div>No properties available</div>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
