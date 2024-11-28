import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const GiveRating = ({ id, type, onNewRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim()) {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        // Post rating to the backend
        const payload = {
          score: rating,
          comment: review,
          propertyId: type === "property" ? id : null,
          vehicleId: type === "vehicle" ? id : null,
        };

        const response = await axios.post(
          "http://localhost:3001/ratings",
          payload,

          { withCredentials: true }
        );

        alert("Rating submitted successfully!");
        onNewRating(response.data);
        setRating(0);
        setReview("");
        setSubmitted(true);
      } catch (err) {
        alert("Failed to submit rating. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please provide both a rating and a review!");
    }
  };

  return (
    <div className="mw-full  mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-sm my-10">
      <h2 className="text-xl font-semibold text-[#9747FF]">Rating/Review</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`w-18 h-18 ${
                  (hover || rating) >= star
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#9747FF] hover:bg-[#7735CC] transition-colors duration-300 px-16 py-3 rounded-md text-white text-lg font-semibold mt-6 shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiveRating;
