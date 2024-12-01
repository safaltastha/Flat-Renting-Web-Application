const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  addReaction,
  getReactionsCount,
  getRatingAndReactions,
  toggleReaction,
} = require("../controllers/reactRatingController");

// Middleware to ensure authentication

// Route to create a rating or review
router.post("/add", authenticateJWT, addReaction);
router.get("/count", authenticateJWT, getReactionsCount);

router.post("/toggle-reaction", authenticateJWT, toggleReaction);
router.post("/:ratingId", authenticateJWT, getRatingAndReactions);

module.exports = router;
