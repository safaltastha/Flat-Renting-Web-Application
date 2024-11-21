// const express = require("express");
// const router = express.Router();
// const { authenticateJWT } = require("../middlewares/authMiddleware");
// const { createVehicle, getAllVehicles, getVehicleById, updateVehicle,deleteVehicle } = require("../controllers/vehicleController");

// // Middleware to parse JSON bodies
// router.use(express.json());

// // POST route to create a new vehicle

// router.post('/',
//     upload.fields([
//         { name: "propertyImage", maxCount: 10 }, //vehicleImage
//         { name: "propertyVideo", maxCount: 5 },
//       ]), authenticateJWT, createVehicle);

// router.get('/', authenticateJWT, getAllVehicles);

// router.get('/:id', authenticateJWT, getVehicleById);

// // Update user route
// router.put('/update/:id', authenticateJWT, updateVehicle);

// // Delete user route
// router.delete('/delete/:id', authenticateJWT, deleteVehicle);

// module.exports = router;

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
      entityType,
    } = req.body; // Ensure entityType is included in the request body

    if (!entityType || entityType !== "vehicle") {
      //vehicle
      return res.status(400).json({
        message: "Invalid or missing entity type. Expected 'vehicle'.",
      });
    }

    try {
      const vehicleData = {
        type,
        capacity,
        registrationNumber,
        availableStart: new Date(availableStart), // Convert to Date object
        availableEnd: new Date(availableEnd),
        pricingPerHour,
        vehicleFeatures,
        vehicleLocation,
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
          attributes: ["id", "name", "email"],
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "vehicle" },
        },
      ],
    });
    console.log("Vehilces with media data:", JSON.stringify(vehicles, null, 2));

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
          attributes: ["id", "name", "email"],
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "vehicle" }, // Include only property media
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

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving property", error });
  }
});

module.exports = router;
