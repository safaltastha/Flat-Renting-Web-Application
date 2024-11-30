const express = require("express");
const router = express.Router();

const {
  createRating,
  likeReview,
  dislikeReview,
  getRatingById,
  getAllRatings,
} = require("../controllers/ratingController");

const { authenticateJWT } = require("../middlewares/authMiddleware");

// Middleware to ensure authentication

// Route to create a rating or review
router.post("/", authenticateJWT, createRating);
router.get("/", authenticateJWT, getAllRatings);

// Get ratings by ID route
router.get("/", authenticateJWT, getRatingById);
router.post("/:reviewId/like", authenticateJWT, likeReview);
router.post("/:reviewId/dislike", authenticateJWT, dislikeReview);

module.exports = router;
