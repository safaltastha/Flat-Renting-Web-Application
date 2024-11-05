// controllers/bookingController.js
const { BookTest, Test, Users, Vehicle } = require("../models");

// Create a new booking
exports.createTest = async (req, res) => {
  const { userId, testId, vehicleId } = req.body;

  try {
    // Ensure the property is available before booking
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res
        .status(400)
        .json({ message: "Property not available for booking." });
    }

    // Create booking entry
    const booking = await Booking.create({
      userId,
      propertyId,
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
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Find the associated property
    const property = await Test.findByPk(booking.propertyId);
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
    const booking = await Booking.findByPk(bookingId);
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
          model: Property, // Include properties posted by the landlord
          as: "landlordProperties", // Use the alias defined in Users model
          include: [
            {
              model: Booking,
              as: "bookings", // Include the associated Booking
              include: [
                {
                  model: Users,
                  attributes: ["name", "email", "phoneNumber"],
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
          as: "vehicle", // Use the correct alias defined in Users model for vehicles
          include: [
            {
              model: Booking, // Include the associated Booking
              as: "bookings", // Ensure this matches the Booking association in Vehicle
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
      const tenantId = req.user.id; // Get the tenant's user ID

      // Fetch all bookings for the tenant, including property and vehicle information
      const tenantBookings = await Booking.findAll({
          where: { userId: tenantId }, // Filter bookings by tenant's user ID
          include: [
              {
                  model: Property, // Include the properties booked
                  as: 'property',
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

      // Separate properties and vehicles into different arrays
      const propertiesBookings = tenantBookings
          .filter(booking => booking.property) // Filter for property bookings
          .map(booking => ({
              id: booking.property.id,
              category: booking.property.category,
          }));

      const vehicleBookings = tenantBookings
          .filter(booking => booking.vehicle) // Filter for vehicle bookings
          .map(booking => ({
              id: booking.vehicle.id,
          }));

      // Create a response object
      const response = {
          propertiesBookings,
          vehicleBookings,
      };

      return res.status(200).json(response); // Return the formatted response
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

