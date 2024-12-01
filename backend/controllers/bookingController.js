// controllers/bookingController.js
const {
  Bookings,
  Property,
  Users,
  Vehicles,
  VehicleBooking,
} = require("../models");

// Handle booking request
exports.createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      isVehicleBooked,
      vehicleId, // corrected to match the payload
      pickupLocation, // corrected to match the payload
      dropoffLocation, // corrected to match the payload
      vehicleDate,
      vehicleTime,
      vehicleDuration, // corrected to match the payload
      requiresPersonnel, // corrected to match the payload
      numPersonnel, // corrected to match the payload
      personnelDuration, // corrected to match the payload
    } = req.body;
    const userId = req.user.id;

    // 1. Create Property Booking (Bookings table)
    const propertyBooking = await Bookings.create({
      userId,
      propertyId,
      status: "booked", // Mark as booked
    });

    // 2. If a vehicle is booked, create a VehicleBooking entry
    let vehicleBooking = null;
    if (isVehicleBooked) {
      if (!pickupLocation || !dropoffLocation || !vehicleDuration) {
        return res.status(400).json({
          message: "Missing required fields for vehicle booking",
        });
      }

      // Create VehicleBooking
      vehicleBooking = await VehicleBooking.create({
        bookingId: propertyBooking.id, // Link VehicleBooking with the created property booking
        vehicleId: vehicleId || null, // If no vehicle, leave as null
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        date: vehicleDate,
        time: vehicleTime,
        vehicleDuration: vehicleDuration,
        requiresPersonnel: requiresPersonnel,
        numPersonnel: requiresPersonnel ? numPersonnel : null, // Only pass personnel details if required
        personnelDuration: requiresPersonnel ? personnelDuration : null, // Only pass personnel details if required
      });
    }

    // Return a response
    res.status(200).json({
      message: "Booking created successfully",
      propertyBooking,
      vehicleBooking: isVehicleBooked ? vehicleBooking : null, // Send vehicle booking only if a vehicle was booked
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while creating booking",
      error: error.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params; // Booking ID passed in the URL

  try {
    // Find the booking by its ID
    const booking = await Bookings.findByPk(bookingId, {
      include: [{ model: Property }, { model: Vehicle }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Delete the booking entry
    await booking.destroy();

    // If the booking had a property, update its status to 'available'
    if (booking.propertyId) {
      const property = await Property.findByPk(booking.propertyId);
      if (property) {
        await property.update({ status: "available" });
      }
    }

    // If the booking had a vehicle, update its status to 'available'
    if (booking.vehicleId) {
      const vehicle = await Vehicle.findByPk(booking.vehicleId);
      if (vehicle) {
        await vehicle.update({ status: "available" });
      }
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

// Update booking status to 'cancelled'
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params; // Assuming the bookingId is passed in the URL

  try {
    // Find the booking by its ID
    const booking = await Bookings.findByPk(bookingId, {
      include: [{ model: Property }, { model: Vehicle }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Check if the booking is already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled." });
    }

    // Update the booking status to 'cancelled'
    await booking.update({ status: "cancelled" });

    // If the booking has a property, update the property's status to 'available'
    if (booking.propertyId) {
      const property = await Property.findByPk(booking.propertyId);
      if (property) {
        await property.update({ status: "available" });
      }
    }

    // If the booking has a vehicle, update the vehicle's status to 'available'
    if (booking.vehicleId) {
      const vehicle = await Vehicle.findByPk(booking.vehicleId);
      if (vehicle) {
        await vehicle.update({ status: "available" });
      }
    }

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error canceling booking", error });
  }
};

// Controller Function to Get Booked Properties for Landlord
exports.getBookedPropertiesForLandlord = async (req, res) => {
  try {
    const landlordId = req.params.id; // Get landlord ID from the route parameters

    // Fetch properties posted by the landlord and their bookings
    const landlordBookings = await Users.findOne({
      where: { id: landlordId },
      attributes: ["id", "firstName", "phoneNumber"],
      attributes: ["id", "firstName", "phoneNumber"],
      include: [
        {
          model: Property, // Include properties posted by the landlord
          as: "landlordProperties", // Use the alias defined in Users model
          include: [
            {
              model: Bookings,
              as: "bookings", // Include the associated Booking
              include: [
                {
                  model: Users,
                  attributes: ["firstName", "email", "phoneNumber"],
                  attributes: ["firstName", "email", "phoneNumber"],
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
      attributes: ["id", "firstName"], // Add the supplier's name and any other relevant attributes
      attributes: ["id", "firstName"], // Add the supplier's name and any other relevant attributes
      include: [
        {
          model: Vehicle, // Include vehicles posted by the supplier
          as: "vehicle", // Use the correct alias defined in Users model for vehicles
          include: [
            {
              model: Bookings, // Include the associated Booking
              as: "bookings", // Ensure this matches the Booking association in Vehicle
              include: [
                {
                  model: Users, // Include user details who booked the vehicle
                  attributes: ["firstName", "email", "phoneNumber"], // Attributes to retrieve
                  attributes: ["firstName", "email", "phoneNumber"], // Attributes to retrieve
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
    const tenantBookings = await Bookings.findAll({
      where: { userId: tenantId }, // Filter bookings by tenant's user ID
      include: [
        {
          model: Property, // Include the properties booked
          as: "property",
          attributes: ["id", "category"], // Select only the fields you want
        },
        {
          model: Vehicle, // Include vehicle information if applicable
          as: "vehicle",
          attributes: ["id"], // Select relevant vehicle fields
        },
      ],
    });

    if (!tenantBookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this tenant" });
    }

    // Separate properties and vehicles into different arrays
    const propertiesBookings = tenantBookings
      .filter((booking) => booking.property) // Filter for property bookings
      .map((booking) => ({
        id: booking.property.id,
        category: booking.property.category,
      }));

    const vehicleBookings = tenantBookings
      .filter((booking) => booking.vehicle) // Filter for vehicle bookings
      .map((booking) => ({
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
