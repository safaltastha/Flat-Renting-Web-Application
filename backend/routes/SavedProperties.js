const express = require("express");
const router = express.Router();

const {
  saveProperty,
  getSavedProperties,
} = require("../controllers/savePropertiesController");

const { authenticateJWT } = require("../middlewares/authMiddleware");

// Middleware to ensure authentication

// Route to create a rating or review
router.post("/", authenticateJWT, saveProperty);
router.get("/", authenticateJWT, getSavedProperties);

module.exports = router;
