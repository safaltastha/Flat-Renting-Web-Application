import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import PropertyCard from "../Property/PropertyCard"; // Import PropertyCard

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom Left Arrow Component
  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-purple-600 border-2 border-transparent text-white rounded-full hover:bg-white hover:border-purple-500 hover:text-black"
        onClick={onClick}
      >
        <FaArrowLeft />
      </button>
    );
  };

  // Custom Right Arrow Component
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-purple-600 border-2 border-transparent text-white rounded-full hover:bg-white hover:border-purple-500 hover:text-black"
        onClick={onClick}
      >
        <FaArrowRight />
      </button>
    );
  };

  // Fetch featured properties from the backend
  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3001/properties");
        setProperties(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Using the custom right arrow
    prevArrow: <PrevArrow />, // Using the custom left arrow
    responsive: [
      {
        breakpoint: 1024, // Tablet and medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Error loading featured properties: {error.message}</div>;

  return (
    <div className="container max-w-[1600px] py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured Properties
      </h2>
      <Slider {...settings}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="px-8">
              {/* Use PropertyCard component */}
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div>No featured properties available</div>
        )}
      </Slider>
    </div>
  );
};

export default FeaturedProperties;
