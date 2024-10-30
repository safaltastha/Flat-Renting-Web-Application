const express = require("express");
const { Vehicle } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();

exports.createVehicle = async (req, res) => {
  const {
    type,
    capacity,
    registrationNumber,
    availableStart,
    availableEnd,
    pricingPerHour,
    vehicleFeatures,
    vehicleLocation,
  } = req.body;

  try {
    // Convert availableStart and availableEnd to Date objects
    const startDate = new Date(availableStart);
    const endDate = new Date(availableEnd);

    // Validate date inputs
    if (startDate >= endDate) {
      return res
        .status(400)
        .json({ error: "Available start must be before available end." });
    }

    // Create a new vehicle record in the database
    const newVehicle = await Vehicle.create({
      type,
      capacity,
      registrationNumber,
      availableStart: startDate,
      availableEnd: endDate,
      pricingPerHour,
      vehicleFeatures,
      vehicleLocation,
      userId: req.user.id,
    });

    // Respond with the created vehicle data
    res
      .status(201)
      .json({ message: "Vehicle created successfully", vehicle: newVehicle });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET route to fetch all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll();
  
      // Check if the vehicles array is empty
      if (vehicles.length === 0) {
        return res.status(404).json({ error: "No vehicles found." });
      }
  
      res.status(200).json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

// GET route to fetch a vehicle by ID
exports.getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update vehicle details
exports.updateVehicle = async (req, res) => {
  const { id } = req.params; // Get vehicle ID from URL parameters
  const {
    type,
    capacity,
    registrationNumber,
    availableStart,
    availableEnd,
    pricingPerHour,
    vehicleFeatures,
    vehicleLocation,
    userId,
  } = req.body;

  try {
    // Find the vehicle by ID
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    // Check for duplicate registration number if it's being updated
    if (
      registrationNumber &&
      registrationNumber !== vehicle.registrationNumber
    ) {
      const existingVehicle = await Vehicle.findOne({
        where: { registrationNumber },
      });
      if (existingVehicle) {
        return res
          .status(400)
          .json({ error: "Registration number must be unique." });
      }
    }

    // Update only the fields that are provided in the request body
    vehicle.type = type !== undefined ? type : vehicle.type;
    vehicle.capacity = capacity !== undefined ? capacity : vehicle.capacity;
    vehicle.registrationNumber =
      registrationNumber !== undefined
        ? registrationNumber
        : vehicle.registrationNumber;

    // Convert and update availableStart and availableEnd to Date objects if provided
    if (availableStart !== undefined) {
      vehicle.availableStart = new Date(availableStart);
    }
    if (availableEnd !== undefined) {
      vehicle.availableEnd = new Date(availableEnd);
    }

    vehicle.pricingPerHour =
      pricingPerHour !== undefined ? pricingPerHour : vehicle.pricingPerHour;
    vehicle.vehicleFeatures =
      vehicleFeatures !== undefined ? vehicleFeatures : vehicle.vehicleFeatures;
    vehicle.vehicleLocation =
      vehicleLocation !== undefined ? vehicleLocation : vehicle.vehicleLocation;
    vehicle.userId = userId !== undefined ? userId : vehicle.userId;

    await vehicle.save(); // Save updated vehicle

    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params; // Get vehicle ID from URL parameters

  try {
    // Find the vehicle by ID
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    await vehicle.destroy(); // Delete vehicle

    res.status(200).json({ message: "Vehicle deleted successfully." });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
