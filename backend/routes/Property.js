const express = require("express");
const path = require("path");
const router = express.Router();
const { Property, Media, Users } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const { searchProperties } = require("../controllers/searchController");
const Room = require("../models/Room");

//Post properties
router.post(
  "/",
  authenticateJWT,
  upload.fields([
    { name: "propertyImage", maxCount: 10 },
    { name: "propertyVideo", maxCount: 5 },
  ]),
  async (req, res) => {
    const { entityType } = req.body; // Ensure entityType is included in the request body

    if (!entityType || entityType !== "property") {
      return res.status(400).json({
        message: "Invalid or missing entity type. Expected 'property'.",
      });
    }
    // Destructure properties from req.body
    const {
      category,
      locationCity,
      locationStreetNumber,
      numOfSpaces,
      numOfBedrooms,
      numOfLivingrooms,
      numOfBathrooms,
      numOfKitchens,
      monthlyRent,
      advancedRent,
      features,
      description,
      houseRule,
      floor,
      StreetName,
    } = req.body;

    try {
      let parsedFeatures;
      try {
        parsedFeatures = JSON.parse(features);
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid features format",
          error: parseError.message,
        });
      }

      const propertyData = {
        category,
        locationCity,
        locationStreetNumber,
        numOfSpaces,
        numOfBedrooms,
        numOfLivingrooms,
        numOfBathrooms,
        numOfKitchens,
        monthlyRent,
        advancedRent,
        features: parsedFeatures,
        description,
        houseRule,
        floor,
        StreetName,
        userId: req.user.id,
      };

      const newProperty = await Property.create(propertyData);

      // Handle image uploads
      if (req.files["propertyImage"]) {
        const imagePaths = req.files["propertyImage"].map(
          (file) => path.join("uploads/properties/images", file.filename) // Updated path
        );

        // Save each image path to the Media table
        await Promise.all(
          imagePaths.map((filePath) =>
            Media.create({
              propertyId: newProperty.id,
              file_path: filePath,
              file_type: "propertyImage",
              entityType: "property", // Specify entity type as property
              vehicleId: null, // No vehicle ID for property media
            })
          )
        );
      }

      // Handle video uploads
      if (req.files["propertyVideo"]) {
        const videoPaths = req.files["propertyVideo"].map(
          (file) => path.join("uploads/properties/videos", file.filename) // Updated path
        );

        // Save each video path to the Media table
        await Promise.all(
          videoPaths.map((filePath) =>
            Media.create({
              propertyId: newProperty.id,
              file_path: filePath,
              file_type: "propertyVideo",
              entityType: "property", // Specify entity type as property
              vehicleId: null, // No vehicle ID for property media
            })
          )
        );
      }

      res.status(201).json({
        message: "Property created successfully",
        property: newProperty,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating property", error });
    }
  }
);

// Get all properties
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "property" },
        },
      ],
    });
    console.log(
      "Properties with media data:",
      JSON.stringify(properties, null, 2)
    );

    const reversedProperties = properties.reverse();

    const baseUrl = "http://localhost:3001"; // Base URL for files

    reversedProperties.forEach((property) => {
      if (property.media) {
        property.media.forEach((mediaItem) => {
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

    res.json(reversedProperties);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Error retrieving properties", error });
  }
});

// search properties
router.get("/search", authenticateJWT, searchProperties);

// Get a property by ID
router.get("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
        {
          model: Media,
          as: "media",
          attributes: ["file_path", "file_type"],
          where: { entityType: "property" }, // Include only property media
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Format media paths
    const baseUrl = "http://localhost:3001"; // Base URL for files
    if (property.media) {
      property.media.forEach((mediaItem) => {
        const filePath = mediaItem.file_path.replace(/\\/g, "/"); // Ensure path formatting is consistent
        mediaItem.file_path = `${baseUrl}/${filePath}`; // Construct full URL
      });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving property", error });
  }
});

// Update a property
router.put(
  "/:id",
  authenticateJWT,
  upload.array("files", 10),
  async (req, res) => {
    const { id } = req.params;

    try {
      const property = await Property.findByPk(id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Update the property with the provided fields
      const updatedData = { ...req.body };

      // Handle media updates
      if (req.files.length > 0) {
        // Remove old media if needed (optional)
        await Media.destroy({ where: { propertyId: id, file_type: "image" } });
        await Media.destroy({ where: { propertyId: id, file_type: "video" } });

        // Process new media uploads
        const imagePaths = req.files
          .filter((file) => file.mimetype.startsWith("image/"))
          .map((file) => path.join("uploads/properties/images", file.filename));

        const videoPaths = req.files
          .filter((file) => file.mimetype.startsWith("video/"))
          .map((file) => path.join("uploads/properties/videos", file.filename));

        // Save each image path to the Media table
        await Promise.all(
          imagePaths.map((filePath) =>
            Media.create({
              propertyId: property.id,
              file_path: filePath,
              file_type: "image",
              entityType: "property", // Set the entity type to property
            })
          )
        );

        // Save each video path to the Media table
        await Promise.all(
          videoPaths.map((filePath) =>
            Media.create({
              propertyId: property.id,
              file_path: filePath,
              file_type: "video",
              entityType: "property", // Set the entity type to property
            })
          )
        );
      }

      // Update the property fields (if necessary)
      await property.update(updatedData);
      res.json({ message: "Property updated successfully", property });
    } catch (error) {
      res.status(500).json({ message: "Error updating property", error });
    }
  }
);

// Delete a property
router.delete("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    // Delete associated media records
    await Media.destroy({ where: { propertyId: id } });

    // Now delete the property itself

    await property.destroy();
    res.json({ message: "Property and associated media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
});

module.exports = router;
