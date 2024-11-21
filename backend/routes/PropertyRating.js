const express = require('express');
const router = express.Router();
const {
    createPropertyRating,
    updatePropertyRating,
    deletePropertyRating,
    getPropertyWithAverageRating
  } = require("../controllers/propertyRatingController");

// Create a new property rating
router.post('/', createPropertyRating);

// Get all ratings for a specific property
router.get('/:property_id', getPropertyWithAverageRating);

// Update a specific property rating
router.put('/:id', updatePropertyRating);

// Delete a specific property rating
router.delete('/:id', deletePropertyRating);

module.exports = router;
