// routes/users.js
const express = require("express");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  createTest,
  cancelBooking,
  getBookedVehicleForVehicleSupplier,
  getBookedPropertiesForTenant,
  getBookedPropertiesForLandlord,
  deleteBooking,
} = require("../controllers/bookController");

const router = express.Router();

// Route to create a booking/test
router.post("/", authenticateJWT, createTest);

// Route to cancel a booking
router.put("/cancel/:bookingId", authenticateJWT, cancelBooking);

// Route to delete a booking
router.delete("/delete/:bookingId", authenticateJWT, deleteBooking);

// Route to get bookings for properties owned by the landlord
router.get("/landlord/:id/bookings", authenticateJWT, getBookedPropertiesForLandlord);

router.get('/tenant/bookings', authenticateJWT, getBookedPropertiesForTenant);

router.get('/supplier/:id/bookings', authenticateJWT, getBookedVehicleForVehicleSupplier);



module.exports = router;
