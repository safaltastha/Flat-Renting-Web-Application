// routes/users.js
const express = require("express");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const {
  cancelBooking,
  getBookedVehicleForVehicleSupplier,
  getBookedPropertiesForTenant,
  getBookedPropertiesForLandlord,
  deleteBooking,
  createBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Route to create a booking
router.post("/", authenticateJWT, createBooking);

// Route to cancel a booking
router.put("/cancel/:bookingId", authenticateJWT, cancelBooking);

// Route to delete a booking
router.delete("/delete/:bookingId", authenticateJWT, deleteBooking);

// Route to get bookings for properties owned by the landlord
router.get(
  "/landlord/:id",
  authenticateJWT,
  getBookedPropertiesForLandlord
);

router.get("/tenant/bookings", authenticateJWT, getBookedPropertiesForTenant);

router.get(
  "/supplier/:id",
  authenticateJWT,
  getBookedVehicleForVehicleSupplier
);

module.exports = router;
