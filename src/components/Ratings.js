import React, { useState, useEffect } from "react";
<<<<<<< HEAD:src/components/Ratings.js

// Sample data for reviews
const sampleReviews = [
  {
    id: 1,
    name: "Smriti G.",
    rating: 5,
    verified: true,
    text: "Best shoes! If you want an AF 1 with good quality and finishing, this is the best place to buy! Check out the looks of AF 1 FROM every side!",
    images: [
      "image1_url.jpg",
      "image2_url.jpg",
      "image3_url.jpg",
      "image4_url.jpg",
    ],
    date: "6 days ago",
    likes: 2,
    dislikes: 0,
  },
  {
    id: 2,
    name: "Dipak S.",
    rating: 4,
    verified: true,
    text: "Best quality shoes for men and most affordable price, I'm satisfied with this product 👍",
    images: ["image5_url.jpg"],
    date: "2 weeks ago",
    likes: 0,
    dislikes: 1,
  },
  // Add more reviews as needed
];

const Ratings = () => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({});
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filter, setFilter] = useState("all");

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
=======
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
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3002/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(response.data, "res");
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
>>>>>>> fc96b82d12482081c2b4a643213f999649b7f923:frontend/src/components/Homepage/FeaturedProperty.js
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Error loading featured properties: {error.message}</div>;

<<<<<<< HEAD:src/components/Ratings.js
  // Handle "like" click
  const handleLike = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  // Handle "dislike" click
  const handleDislike = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, dislikes: review.dislikes + 1 }
          : review
      )
    );
  };
=======
  console.log(properties, "asdf");
>>>>>>> fc96b82d12482081c2b4a643213f999649b7f923:frontend/src/components/Homepage/FeaturedProperty.js

  return (
    <div className="container max-w-[1600px] py-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
<<<<<<< HEAD:src/components/Ratings.js

        {/* Sort and Filter */}

        {/* Reviews */}
        <div className="reviews mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="review-item border-b pb-4 mb-4">
              {/* Star Rating and Verified Purchase */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-500 ${
                      index < review.rating ? "filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* Reviewer Info */}
              <p className="text-gray-700 font-semibold">{review.name}</p>
              <p className="text-gray-500 text-sm">{review.date}</p>
              {/* Review Text */}
              <p className="text-gray-700 mt-2">{review.text}</p>
              {/* Review Images */}

              {/* Likes and Dislikes */}
              <div className="flex items-center mt-2">
                <div
                  className="flex items-center text-gray-500 cursor-pointer mr-4"
                  onClick={() => handleLike(review.id)}
                >
                  👍 <span className="ml-1">{review.likes}</span>
                </div>
                <div
                  className="flex items-center text-gray-500 cursor-pointer"
                  onClick={() => handleDislike(review.id)}
                >
                  👎 <span className="ml-1">{review.dislikes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
=======
      ) : (
        <div className="text-center">No featured properties available</div>
      )}
>>>>>>> fc96b82d12482081c2b4a643213f999649b7f923:frontend/src/components/Homepage/FeaturedProperty.js
    </div>
  );
};

<<<<<<< HEAD:src/components/Ratings.js
export default Ratings;
=======
export default FeaturedProperties;
>>>>>>> fc96b82d12482081c2b4a643213f999649b7f923:frontend/src/components/Homepage/FeaturedProperty.js
