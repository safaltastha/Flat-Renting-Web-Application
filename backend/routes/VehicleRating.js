const express = require('express');
const router = express.Router();
const {
    createVehicleRating,
    updateVehicleRating,
    deleteVehicleRating,
    getVehicleWithAverageRating
  } = require("../controllers/vehicleRatingController");
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Create a new property rating
router.post('/', authenticateJWT, createVehicleRating);

// Get all ratings for a specific property
router.get('/:vehicle_id', authenticateJWT, getVehicleWithAverageRating);

// Update a specific property rating
router.put('/:id', authenticateJWT, updateVehicleRating);

// Delete a specific property rating
router.delete('/:id',authenticateJWT, deleteVehicleRating);

module.exports = router;
