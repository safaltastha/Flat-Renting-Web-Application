// controllers/userRatingController.js
const { UserRating, Users } = require('../models'); // Import your models

// Function to calculate the average rating for a user
const calculateAverageRating = async (rated_user_id) => {
  // Find all ratings for the rated user
  const ratings = await UserRating.findAll({
    where: {
      rated_user_id,
    },
  });

  // Calculate total ratings and sum of rating values
  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce((acc, rating) => acc + rating.rating_value, 0);

  // Calculate average
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;

  return averageRating;
};

// Function to rate a user
exports.rateUser = async (req, res) => {
  try {
    const { rated_user_id, rating_value, review_text } = req.body;
    const rater_id = req.user.id; // The logged-in user

    // Validate input
    if (!rated_user_id || !rating_value) {
      return res.status(400).json({ error: "Rated user ID and rating value are required" });
    }

    if (rating_value < 1 || rating_value > 5) {
      return res.status(400).json({ error: "Rating value must be between 1 and 5" });
    }

    // Ensure a user cannot rate themselves
    if (rater_id === rated_user_id) {
      return res.status(400).json({ error: "You cannot rate yourself" });
    }

    // Check if the rated user exists and retrieve their role
    const ratedUser = await Users.findByPk(rated_user_id);
    if (!ratedUser) {
      return res.status(404).json({ error: "User to be rated not found" });
    }

    // Retrieve the user's role from the rated user
    const rated_user_type = ratedUser.role;

    // Check if the user has already rated the rated user
    const existingRating = await UserRating.findOne({
      where: {
        rater_id,
        rated_user_id,
      }
    });

    if (existingRating) {
      return res.status(400).json({ error: "You have already rated this user" });
    }

    // Create the rating in the database
    const newRating = await UserRating.create({
      rating_value,
      review_text,
      rater_id,
      rated_user_id,
      rated_user_type, // Automatically set based on the rated user's role
    });

    // Calculate the average rating of the rated user
    const averageRating = await calculateAverageRating(rated_user_id);

    // Respond with success and the new rating details along with the average rating
    res.status(201).json({
      message: "User rated successfully",
      rating: newRating,
      averageRating, // Include average rating in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a user rating by ID

exports.getUserRatingById = async (req, res) => {
    const { ratingId } = req.params; // Extract rating ID from the URL parameters
    
    try {
      // Find the rating with the provided rating ID
      const rating = await UserRating.findByPk(ratingId);
      
      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }
  
      // Return the rating data
      res.status(200).json({ rating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving rating", error });
    }
  };

  // Update a user rating
exports.updateUserRating = async (req, res) => {
    const { ratingId } = req.params; // Extract rating ID from the URL parameters
    const { rating_value, review_text } = req.body; // Extract rating value and review text from the request body
    const rater_id = req.user.id; // Logged-in user
  
    try {
      // Find the rating to be updated
      const rating = await UserRating.findByPk(ratingId);
  
      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }
  
      // Ensure the logged-in user is the one who created the rating (if you want to enforce this)
      if (rating.rater_id !== rater_id) {
        return res.status(403).json({ message: "You can only update your own ratings" });
      }
  
      // Update the rating values
      rating.rating_value = rating_value || rating.rating_value; // If no new rating value, keep the old one
      rating.review_text = review_text || rating.review_text; // If no new review text, keep the old one
  
      // Save the updated rating to the database
      await rating.save();
  
      // Respond with the updated rating
      res.status(200).json({ message: "Rating updated successfully", rating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating rating", error });
    }
  };
  

  // Delete a user rating
exports.deleteUserRating = async (req, res) => {
    const { ratingId } = req.params; // Extract rating ID from the URL parameters
    const rater_id = req.user.id; // Logged-in user
  
    try {
      // Find the rating to be deleted
      const rating = await UserRating.findByPk(ratingId);
  
      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }
  
      // Ensure the logged-in user is the one who created the rating (if you want to enforce this)
      if (rating.rater_id !== rater_id) {
        return res.status(403).json({ message: "You can only delete your own ratings" });
      }
  
      // Delete the rating from the database
      await rating.destroy();
  
      // Respond with a success message
      res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting rating", error });
    }
  };
  
  
  
