import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import PropertyCard from "../Property/PropertyCard";
import Cookies from "js-cookie";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate average rating and rating counts
  useEffect(() => {
    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const avgRating = (totalRatings / reviews.length).toFixed(1);
    setAverageRating(avgRating);

    const counts = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});
    setRatingCounts(counts);
  }, [reviews]);

  // Handle sorting by relevance or recent
  const handleSort = (order) => {
    const sortedReviews = [...reviews];
    if (order === "recent") {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setSortOrder(order);
    setReviews(sortedReviews);
  };

  // Fetch featured properties from the backend
  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3001/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
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
    infinite: false, // Enable infinite scrolling only if there are more than 1 property
    speed: 500,
    slidesToShow: Math.min(properties.length, 3), // Show only as many slides as there are properties (max 3)
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet and medium screens
        settings: {
          slidesToShow: Math.min(properties.length, 2), // Adjust for smaller screens
        },
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1, // Show only one slide on mobile
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Error loading featured properties: {error.message}</div>;

  return (
    <div className="container h-50  max-w-[1600px] p-12 relative">
      <h2 className="text-5xl md:text-2xl font-bold mb-6 text-center">
        Featured Properties
      </h2>
      {properties.length > 0 ? (
        <div
          className={`${properties.length === 1 ? "flex justify-center" : ""}`} // Center slider when there's only one property
        >
          <Slider
            {...{
              ...settings,
              centerMode: properties.length === 1, // Enable center mode for single property
              centerPadding: properties.length === 1 ? "0px" : "50px", // Remove padding for single property
            }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className={`px-8 ${properties.length === 1 ? "mx-auto" : ""}`} // Center single slide
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="text-center">No featured properties available</div>
      )}
    </div>
  );
};

export default RatingReviewComponent;
