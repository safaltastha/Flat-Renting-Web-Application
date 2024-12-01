const express = require("express");
const express = require("express");
const router = express.Router();


const {
  createRating,
  deleteReview,
  getRatingById,
  getAllRatings,
  editReview,
} = require("../controllers/ratingController");

const { authenticateJWT } = require("../middlewares/authMiddleware");

// Middleware to ensure authentication

// Route to create a rating or review
router.post("/", authenticateJWT, createRating);

// // Get ratings by ID route
router.get("/get", authenticateJWT, getRatingById);

router.get("/", authenticateJWT, getAllRatings);

// Route to edit a review
router.put("/review/:id", authenticateJWT, editReview);

// Route to delete a review
router.delete("/review/:id", authenticateJWT, deleteReview);

module.exports = router;
