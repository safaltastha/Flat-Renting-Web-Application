// controllers/bookingController.js
const { BookTest, Test, Users, Vehicle } = require("../models");

// Create a new booking
exports.createTest = async (req, res) => {
  const { userId, testId, vehicleId } = req.body;

  try {
    // Ensure the property is available before booking
    const property = await Test.findByPk(testId);
    if (!property) {
      return res
        .status(400)
        .json({ message: "Property not available for booking." });
    }

    // Create booking entry
    const booking = await BookTest.create({
      userId,
      testId,
      vehicleId: vehicleId || null,
      status: "booked",
    });

    // Update property status to 'booked'
    await property.update({ status: "booked" });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};

exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await BookTest.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Find the associated property
    const property = await Test.findByPk(booking.testId);
    if (!property) {
      return res
        .status(404)
        .json({ message: "Associated property not found." });
    }

    // Delete the booking
    await booking.destroy();

    // Update property status back to 'available'
    await property.update({ status: "available" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

// Update booking status to 'cancelled'
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await BookTest.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    await booking.update({ status: "cancelled" });
    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};



// Controller Function to Get Booked Properties for Landlord
exports.getBookedPropertiesForLandlord = async (req, res) => {
  try {
    const landlordId = req.params.id; // Get landlord ID from the route parameters

    // Fetch properties posted by the landlord and their bookings
    const landlordBookings = await Users.findOne({
      where: { id: landlordId },
      attributes: ["id", "name", "phoneNumber"],
      include: [
        {
          model: Test, // Include properties posted by the landlord
          as: "landlordBookProperties", // Use the alias defined in Users model
          include: [
            {
              model: BookTest,
              as: "booktests", // Include the associated BookTests
              include: [
                {
                  model: Users,
                  attributes: ["name", "email", "phoneNumber"],
                },
                {
                  model: Vehicle, // Include vehicle information if applicable
                  as: "vehicle",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!landlordBookings) {
      return res
        .status(404)
        .json({ message: "Landlord not found or no bookings available" });
    }

    return res.status(200).json(landlordBookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBookedVehicleForVehicleSupplier = async (req, res) => {
    try {
      const supplierId = req.params.id; // Get supplier ID from the route parameters
  
      // Fetch vehicles posted by the supplier and their bookings
      const supplierBookings = await Users.findOne({
        where: { id: supplierId },
        attributes: ["id", "name"], // Add the supplier's name and any other relevant attributes
        include: [
          {
            model: Vehicle, // Include vehicles posted by the supplier
            as: "vehicles", // Use the correct alias defined in Users model for vehicles
            include: [
              {
                model: BookTest, // Include the associated Booking
                as: "booktests", // Ensure this matches the Booking association in Vehicle
                include: [
                  {
                    model: Users, // Include user details who booked the vehicle
                    attributes: ["name", "email", "phoneNumber"], // Attributes to retrieve
                  },
                ],
              },
            ],
          },
        ],
      });
  
      if (!supplierBookings) {
        return res
          .status(404)
          .json({ message: "Supplier not found or no bookings available" });
      }
  
      return res.status(200).json(supplierBookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



exports.getBookedPropertiesForTenant = async (req, res) => {
    try {
        const tenantId = req.user.id; // Assuming you have stored user info in req.user after authentication

        // Fetch all bookings for the tenant, including property and vehicle information
        const tenantBookings = await BookTest.findAll({
            where: { userId: tenantId }, // Filter bookings by tenant's user ID
            include: [
                {
                    model: Test, // Include the properties booked
                    as: 'test',
                    attributes: ['id', 'category'], // Select only the fields you want
                },
                {
                    model: Vehicle, // Include vehicle information if applicable
                    as: 'vehicle',
                    attributes: ['id'], // Select relevant vehicle fields
                },
            ],
        });

        if (!tenantBookings.length) {
            return res.status(404).json({ message: 'No bookings found for this tenant' });
        }

        return res.status(200).json(tenantBookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
