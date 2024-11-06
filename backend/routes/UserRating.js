// routes/userRatingRoutes.js
const express = require("express");
const router = express.Router();
const { rateUser, getUserRatingById, updateUserRating, deleteUserRating } = require("../controllers/userRatingController");
const { authenticateJWT } = require("../middlewares/authMiddleware");


// Route to rate a user
router.post("/", authenticateJWT, rateUser);
router.get("/:ratingId", authenticateJWT, getUserRatingById);
router.put("/:ratingId", authenticateJWT, updateUserRating);
router.delete("/:ratingId", authenticateJWT, deleteUserRating);

module.exports = router;
