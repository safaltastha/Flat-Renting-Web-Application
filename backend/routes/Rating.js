// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const {
    addRating,
    getPropertyRatings,
    getUserRatings,
    getVehicleRatings
  } = require("../controllers/ratingController");


  
router.post('/rate', addRating);
router.get('/user/:userId', getUserRatings);
router.get('/property/:propertyId', getPropertyRatings);
router.get('/vehicle/:vehicleId', getVehicleRatings);

module.exports = router;
