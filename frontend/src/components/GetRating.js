import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "../context/UserContext";
import { Link, useLocation, useParams } from "react-router-dom";
import EditReviewModal from "../../src/components/modals/EditReviewModal";
import DeleteReviewModal from "../../src/components/modals/DeleteReviewModal";
import { BiDotsVerticalRounded } from "react-icons/bi";
const GetRating = ({ propertyId, vehicleId, review, onSave, ratingId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({});
  const [sortOrder, setSortOrder] = useState("relevance");
  const [filter, setFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false); // State to control modal visibility
  const [selectedReview, setSelectedReview] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [reviewToDelete, setReviewToDelete] = useState(null); // Store the review data to delete
  const [rating, setRating] = useState(null);
  const [reactions, setReactions] = useState({ like: 0, dislike: 0 });
  const [userReaction, setUserReaction] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [openReviewDeleteModal, setOpenReviewDeleteModal] = useState(false);
  const params = useParams();
  const location = useLocation();
  console.log(location.pathname.split("/")[1], " loaction");

  useEffect(() => {
    console.log("Active Menu updated:", activeMenu); // Logs updated value of activeMenu
  }, [activeMenu]); // This effect runs every time activeMenu changes

  // Fetch ratings and reviews for the specific property or vehicle
  const fetchReviews = async () => {
    try {
      const params = propertyId
        ? { propertyId }
        : vehicleId
        ? { vehicleId }
        : {}; // Default to an empty object if neither propertyId nor vehicleId is provided

      // Log params to make sure propertyId or vehicleId is being set correctly
      console.log("Params:", params);

      const response = await axios.get(`http://localhost:3002/ratings/get`, {
        params,
        withCredentials: true,
      });

      const fetchedReviews = response.data;
      console.log("Fetched Reviews:", fetchedReviews);

      const formatDate = (dateString) => {
        const date = new Date(dateString); // Convert the ISO string into a Date object
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      if (Array.isArray(fetchedReviews) && fetchedReviews.length > 0) {
        const mappedReviews = fetchedReviews.map((review) => {
          const capitalizeFirstLetter = (name) => {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
          };

          const reviewUserName =
            review.user?.firstName && review.user?.lastName
              ? `${capitalizeFirstLetter(
                  review.user.firstName
                )} ${capitalizeFirstLetter(review.user.lastName)}` // Capitalize first and last name
              : "Anonymous"; // Fallback to "Anonymous" if firstName or lastName is missing

          return {
            id: review.id,
            name: reviewUserName,
            score: review.score, // Mapping score to rating
            verified: true, // You can add logic here for verified reviews
            text: review.review || "No review text available", // Handle null or undefined comments
            date: formatDate(review.createdAt) || "Date not available", // Handle missing date
            likes: review.likes || 0,
            dislikes: review.dislikes || 0,
          };
        });

        setReviews(mappedReviews); // Set state with the mapped reviews
      } else {
        // If no reviews, set an empty array or handle accordingly
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleEdit = (review) => {
    setCurrentReview(review);
    setOpenModal(true); // Open the modal
  };

  const handleSave = (updatedText) => {
    // Update the review in the state (you might want to make an API call here)
    console.log(`Updated Review Text: ${updatedText}`);
    setOpenModal(false); // Close the modal
    setCurrentReview(null);
  };

  const handleSaveReview = (editedText) => {
    onSave(editedText); // Pass the edited text to the parent to save it
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setCurrentReview(null); // Reset the current review
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setReviewToDelete(null); // Clear the review data
  };

  const handleReaction = async (reaction) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/reaction/toggle-reaction`,
        {
          ratingId,
          reaction,
        }
      );

      if (response.status === 200) {
        setUserReaction(reaction);
        // Update the reaction count in the UI
        setReactions((prevReactions) => {
          if (reaction === "like") {
            return { ...prevReactions, like: prevReactions.like + 1 };
          } else if (reaction === "dislike") {
            return { ...prevReactions, dislike: prevReactions.dislike + 1 };
          }
          return prevReactions;
        });
      }
    } catch (error) {
      console.error("Error adding reaction", error);
    }
  };

  const handleDelete = (reviewId, propertyId, vehicleId) => {
    setReviewToDelete({ reviewId, propertyId, vehicleId }); // Store review data
    setOpenReviewDeleteModal(true);
    // setIsModalOpen(true); // Show modal
  };

  const handleConfirmDelete = async () => {
    // Handle the delete action here, e.g., send request to the backend to delete
    const { reviewId } = reviewToDelete;

    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:3002/ratings/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        data: {
          // propertyId: params.id,
          // vehicleId,
          propertyId:
            location.pathname.split("/")[1] === "properties" ? params.id : null,
          vehicleId:
            location.pathname.split("/")[1] === "vehicles" ? params.id : null,
        },
      });
      // Handle success (e.g., remove the review from the UI or show success alert)
      alert("Review deleted successfully!");
      setOpenReviewDeleteModal(false); // Close modal after success
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId, vehicleId, review]); // Re-run effect when propertyId or vehicleId changes

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(`/api/ratings/${ratingId}/reactions`);
        setLikeCount(response.data.likeCount);
        setDislikeCount(response.data.dislikeCount);
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();
  }, [ratingId]);

  // Calculate average rating and rating counts
  useEffect(() => {
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce(
        (acc, review) => acc + review.score,
        0
      );
      const avgRating = (totalRatings / reviews.length).toFixed(1);
      setAverageRating(avgRating);

      const counts = reviews.reduce((acc, review) => {
        acc[review.score] = (acc[review.score] || 0) + 1;
        return acc;
      }, {});
      setRatingCounts(counts);
    }
  }, [reviews]);

  return (
    <div className="  ">
      <div className=" p-6 bg-white shadow-md rounded-lg w-1/2">
        {/* Overall Rating */}
        <div className=" flex items-center">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div className="text-gray-500 text-xl">/5</div>
          <div className="ml-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-500 ${
                  index < Math.round(averageRating) ? "filled" : "opacity-40"
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
                      index < review.score ? "filled" : "opacity-40"
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
              <div className="flex justify-between items-center relative">
                <p className="text-gray-700 mt-2 flex-grow">{review.text}</p>
                <span
                  className="cursor-pointer relative"
                  onClick={() => {
                    setActiveMenu((prev) =>
                      prev === review.id ? null : review.id
                    );
                    console.log("hello", activeMenu);
                  }}
                >
                  <BiDotsVerticalRounded size={20} />
                </span>
                {activeMenu === review.id && (
                  <div className="absolute right-0 top-1 mt-6 bg-white border shadow-lg rounded-md">
                    <button
                      className="block px-4  py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          review.id,
                          review.propertyId,
                          review.vehicleId
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}

                {/* {isModalOpen && ( */}
                <DeleteReviewModal
                  // review={reviewToDelete}
                  onConfirm={handleConfirmDelete}
                  // onClose={closeModal}
                  openReviewDeleteModal={openReviewDeleteModal}
                  setOpenReviewDeleteModal={setOpenReviewDeleteModal}
                />
                {/* )} */}

                {openModal && (
                  <EditReviewModal
                    reviewId={review.id}
                    fetchReviews={fetchReviews}
                    review={currentReview} // Pass the current review to the modal
                    onSave={handleSave} // Pass the handleSaveReview function to the modal
                    onClose={handleCloseModal} // Pass close modal function
                  />
                )}
              </div>

              {/* Likes and Dislikes */}
              <div className="reactions">
                <button
                  className={`thumbs-up ${
                    userReaction === "like" ? "active" : ""
                  }`}
                  onClick={() => handleReaction("like")}
                >
                  👍 {likeCount}
                </button>

                <button
                  className={`thumbs-down ${
                    userReaction === "dislike" ? "active" : ""
                  }`}
                  onClick={() => handleReaction("dislike")}
                >
                  👎 {dislikeCount}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetRating;
