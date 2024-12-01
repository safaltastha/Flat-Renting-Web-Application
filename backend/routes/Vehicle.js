const express = require("express");
const path = require("path");
const router = express.Router();
const { Vehicle, Media, Users } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const fs = require("fs");

//Post properties
router.post(
  "/",
  authenticateJWT,
  upload.fields([
    { name: "vehicleImage", maxCount: 10 }, //vehicleImage
    { name: "vehicleVideo", maxCount: 5 },
  ]),

  async (req, res) => {
    console.log(req.files, "Files uploaded");

    const {
      type,
      capacity,
      registrationNumber,
      availableStart,
      availableEnd,
      pricingPerHour,
      vehicleFeatures,
      vehicleLocation,
      availabilityTime,
      entityType,
    } = req.body; // Ensure entityType is included in the request body

    if (!entityType || entityType !== "vehicle") {
      //vehicle
      return res.status(400).json({
        message: "Invalid or missing entity type. Expected 'vehicle'.",
      });
    }

    if (!availableStart || !availableEnd) {
      return res
        .status(400)
        .json({ message: "Both start and end dates are required." });
    }

    const startDate = new Date(availableStart);
    const endDate = new Date(availableEnd);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Availability End must be after Availability Start.",
      });
    }

    // Updated Regex for multiple formats
    const timeFormatRegex =
      /^(1[0-2]|0?[1-9])(am|pm)-(1[0-2]|0?[1-9])(am|pm)$|^between\s(1[0-2]|0?[1-9])(am|pm)-(1[0-2]|0?[1-9])(am|pm)$|^after\s(1[0-2]|0?[1-9])(am|pm)$/;

    // Debug: Log availabilityTime to check if it matches expected value
    console.log("Availability Time:", availabilityTime);

    // Validate availabilityTime (ensure it matches the expected format)
    if (!timeFormatRegex.test(availabilityTime)) {
      return res.status(400).json({
        message:
          "Invalid availability time format. Use formats like '1pm-2pm', 'between 1pm-2pm', or 'after 2pm'.",
      });
    }

    try {
      const vehicleData = {
        type,
        capacity,
        registrationNumber,
        availableStart: startDate, // Convert to Date object
        availableEnd: endDate,
        pricingPerHour,
        vehicleFeatures,
        vehicleLocation,
        availabilityTime,
    
        userId: req.user.id,
        entityType,
      };

      const newVehicle = await Vehicle.create(vehicleData);

      const imagesDirectory = path.join(__dirname, "uploads/vehicles/images");
      if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory, { recursive: true });
      }

      // Handle image uploads
      if (req.files["vehicleImage"]) {
        const imagePaths = req.files["vehicleImage"].map(
          (file) => path.join("uploads/vehicles/images", file.filename) // Updated path
        );

        // Save each image path to the Media table
        await Promise.all(
          imagePaths.map((filePath) =>
            Media.create({
              propertyId: null,
              file_path: filePath,
              file_type: "image",
              entityType: "vehicle",
              vehicleId: newVehicle.id,
            }).catch((err) => {
              console.log("Error saving image to Media:", err);
            })
          )
        );
      }

      // Handle video uploads
      if (req.files["vehicleVideo"]) {
        const videoPaths = req.files["vehicleVideo"].map(
          (file) => path.join("uploads/vehicles/videos", file.filename) // Updated path
        );

        // Save each video path to the Media table
        await Promise.all(
          videoPaths.map((filePath) =>
            Media.create({
              propertyId: null,
              file_path: filePath,
              file_type: "video",
              entityType: "vehicle",
              vehicleId: newVehicle.id,
            }).catch((err) => {
              console.log("Error saving video to Media:", err);
            })
          )
        );
      }

      res.status(201).json({
        message: "Vehicle created successfully",
        vehicle: newVehicle,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating vehicle", error });
      console.log(error, "érqw3434");
    }
  }
);

// Get all properties
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "vehicle" },
        },
      ],
    });
    console.log("Vehicles with media data:", JSON.stringify(vehicles, null, 2));

    const reversedVehicles = vehicles.reverse();

    const baseUrl = "http://localhost:3001"; // Base URL for files

    reversedVehicles.forEach((vehicle) => {
      if (vehicle.media) {
        vehicle.media.forEach((mediaItem) => {
          const filePath = mediaItem.file_path.replace(/\\/g, "/"); // Ensure path formatting is consistent
          if (mediaItem.file_type === "image") {
            // Use the filePath directly without adding '/images'
            mediaItem.file_path = `${baseUrl}/${filePath}`;
          } else if (mediaItem.file_type === "video") {
            // Use the filePath directly without adding '/videos'
            mediaItem.file_path = `${baseUrl}/${filePath}`;
          }
        });
      }
    });

    res.json(reversedVehicles);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Error retrieving properties", error });
  }
});

// Get a property by ID
router.get("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "address",
          ], // Include vehicle supplier details
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "vehicle" }, // Include only vehicle media
        },
      ],
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Format media paths
    const baseUrl = "http://localhost:3001"; // Base URL for files
    if (vehicle.media) {
      vehicle.media.forEach((mediaItem) => {
        const filePath = mediaItem.file_path.replace(/\\/g, "/"); // Ensure path formatting is consistent
        mediaItem.file_path = `${baseUrl}/${filePath}`; // Construct full URL
      });
    }

    // Respond with vehicle details and vehicleSupplier (vehicle owner) info
    res.status(200).json({
      id: vehicle.id,
      type: vehicle.type,
      pricingPerHour:vehicle.pricingPerHour,
      capacity:vehicle.capacity,
      registrationNumber: vehicle.registrationNumber,
      description: vehicle.description,
      vehicleLocation: vehicle.vehicleLocation,
      features: vehicle.features,
      media: vehicle.media,
      availabilityTime: vehicle.availabilityTime, // Corrected to fetch from vehicle itself
      availableStart: vehicle.availableStart,
      availableEnd: vehicle.availableEnd,
      vehicleSupplier: {
        id: vehicle.User.id,
        firstName: vehicle.User.firstName,
        lastName: vehicle.User.lastName,
        email: vehicle.User.email,
        phoneNumber: vehicle.User.phoneNumber, // Assuming this exists in the `Users` table
        address: vehicle.User.address,
      },
    });
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving vehicle", error });
  }
});

// Delete a property
router.delete("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Property not found" });
    }
    // Delete associated media records
    await Media.destroy({ where: { vehicleId: id } });

    // Now delete the property itself

    await vehicle.destroy();
    res.json({ message: "Vehicle and associated media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error });
  }
});

module.exports = router;
