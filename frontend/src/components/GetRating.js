import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

const GetRating = ({ propertyId, vehicleId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({});
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filter, setFilter] = useState("all");

  // Fetch ratings and reviews for the specific property or vehicle
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const params = propertyId
          ? { propertyId }
          : vehicleId
          ? { vehicleId }
          : {}; // Default to an empty object if neither propertyId nor vehicleId is provided

        // Log params to make sure propertyId or vehicleId is being set correctly
        console.log("Params:", params);

        const response = await axios.get("http://localhost:3001/ratings", {
          params,
          withCredentials: true,
        });

        console.log("API Response:", response.data); // Log the full API response

        const fetchedReviews = response.data;

        const formatDate = (dateString) => {
          const date = new Date(dateString); // Convert the ISO string into a Date object
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        };

        // Ensure that fetchedReviews is an array and contains reviews
        if (Array.isArray(fetchedReviews) && fetchedReviews.length > 0) {
          const mappedReviews = fetchedReviews.map((review) => ({
            id: review.id,
            name: review.user?.name || "Anonymous", // Use email or fallback
            rating: review.score, // Mapping score to rating
            verified: true, // You can add logic here for verified reviews
            text: review.comment || "No comment", // Handle null or undefined comments
            date: formatDate(review.createdAt) || "Date not available", // Handle missing date
            likes: review.likes || 0,
            dislikes: review.dislikes || 0,
          }));

          setReviews(mappedReviews); // Set state with the mapped reviews
        } else {
          // If no reviews, set an empty array or handle accordingly
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (propertyId || vehicleId) {
      fetchReviews();
    }
  }, [propertyId, vehicleId]); // Re-run effect when propertyId or vehicleId changes

  // Calculate average rating and rating counts
  useEffect(() => {
    if (reviews.length > 0) {
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
    }
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

  // Handle filtering by star rating
  const handleFilter = (stars) => {
    if (stars === "all") {
      setFilter("all");
      setReviews(reviews); // Reset to all reviews
    } else {
      const filteredReviews = reviews.filter(
        (review) => review.rating === stars
      );
      setFilter(stars);
      setReviews(filteredReviews);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/ratings/${reviewId}/like`,
        {}, // You can add additional data if needed
        { withCredentials: true }
      );
      // Update the review with the new likes count
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, likes: response.data.likes }
            : review
        )
      );
      alert("Like added successfully!");
    } catch (error) {
      console.error("Error liking review:", error);
      alert("Failed to like the review.");
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `http://localhost:3001/ratings/${reviewId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
          },

          withCredentials: true,
        }
      );
      // Update the review with the new dislikes count
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, dislikes: response.data.dislikes }
            : review
        )
      );
      alert("Dislike added successfully!");
    } catch (error) {
      console.error("Error disliking review:", error);
      alert("Failed to dislike the review.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rating-review-container p-6 bg-white shadow-md rounded-lg w-full ">
        {/* Overall Rating */}
        <div className="overall-rating flex items-center">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div className="text-gray-500 text-xl">/5</div>
          <div className="ml-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-500 text-xl ${
                  index < Math.round(averageRating) ? "filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="ml-4 text-gray-500">{reviews.length} Ratings</p>
        </div>

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
              {/* Likes and Dislikes */}
              <div className="flex items-center mt-2">
                <div
                  className="flex items-center text-gray-500 cursor-pointer mr-4"
                  onClick={() => handleLike(review.id)}
                >
                  <BiSolidLike className="text-yellow-500 " />
                  <span className="ml-1">{review.likes}</span>
                </div>
                <div
                  className="flex items-center text-gray-500 cursor-pointer"
                  onClick={() => handleDislike(review.id)}
                >
                  <BiSolidDislike className="text-yellow-500 " />{" "}
                  <span className="ml-1">{review.dislikes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetRating;
