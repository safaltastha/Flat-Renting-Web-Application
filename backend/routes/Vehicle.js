const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const { createVehicle, getAllVehicles, getVehicleById, updateVehicle,deleteVehicle } = require("../controllers/vehicleController");

// Middleware to parse JSON bodies
router.use(express.json());

// POST route to create a new vehicle

router.post('/', authenticateJWT, createVehicle);

router.get('/', authenticateJWT, getAllVehicles);

router.get('/:id', authenticateJWT, getVehicleById);

// Update user route
router.put('/update/:id', authenticateJWT, updateVehicle);

// Delete user route
router.delete('/delete/:id', authenticateJWT, deleteVehicle);


module.exports = router;
