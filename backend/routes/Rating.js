const express = require("express");
const router = express.Router();

const {
  createRating,

  getRatingById,
} = require("../controllers/ratingController");

const { authenticateJWT } = require("../middlewares/authMiddleware");

// Middleware to ensure authentication

// Route to create a rating or review
router.post("/", authenticateJWT, createRating);

// Get ratings by ID route
router.get("/", authenticateJWT, getRatingById);

module.exports = router;
