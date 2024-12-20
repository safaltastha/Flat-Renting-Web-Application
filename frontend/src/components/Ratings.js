import React, { useState, useEffect } from "react";

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
  };

  // Handle filtering by star rating
  const handleFilter = (stars) => {
    if (stars === "all") {
      setFilter("all");
      setReviews(sampleReviews);
    } else {
      const filteredReviews = sampleReviews.filter(
        (review) => review.rating === stars
      );
      setFilter(stars);
      setReviews(filteredReviews);
    }
  };

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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rating-review-container p-6 bg-white shadow-md rounded-lg w-1/2">
        {/* Overall Rating */}
        <div className="overall-rating flex items-center">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div className="text-gray-500 text-xl">/5</div>
          <div className="ml-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-500 ${
                  index < Math.round(averageRating) ? "filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="ml-4 text-gray-500">{reviews.length} Ratings</p>
        </div>

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
    </div>
  );
};

export default Ratings;
