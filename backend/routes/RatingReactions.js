const express = require("express");
const router = express.Router();
const { reactToRating } = require("../controllers/reactToRatingController");

// Route to add a reaction (like/dislike) to a rating
router.post("/ratings/:ratingId/react", reactToRating);

module.exports = router;
