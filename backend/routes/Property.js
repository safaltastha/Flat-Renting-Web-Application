const express = require("express");
const path = require("path");
const router = express.Router();
const { Property, Media, Users } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const { searchProperties } = require("../controllers/searchController");

const fs = require("fs");

//Post properties
router.post(
  "/",
  authenticateJWT,
  upload.fields([
    { name: "propertyImage", maxCount: 10 }, //vehicleImage
    { name: "propertyVideo", maxCount: 5 },
  ]),

  async (req, res) => {
    console.log(req.files, "Files uploaded");

    const {
      entityType,
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
      availableStart,
      availableEnd,
      availabilityTime,
      dimensions,
    } = req.body; // Ensure entityType is included in the request body

    if (!entityType || entityType !== "property") {
      //vehicle
      return res.status(400).json({
        message: "Invalid or missing entity type. Expected 'property'.",
      });
    }

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
      let parsedDimensions = {};
      if (dimensions) {
        try {
          parsedDimensions = {
            bedrooms: dimensions.bedrooms?.map((room) => ({
              length: parseFloat(room.length) || 0,
              breadth: parseFloat(room.breadth) || 0,
            })),
            kitchens: dimensions.kitchens?.map((room) => ({
              length: parseFloat(room.length) || 0,
              breadth: parseFloat(room.breadth) || 0,
            })),
            livingrooms: dimensions.livingrooms?.map((room) => ({
              length: parseFloat(room.length) || 0,
              breadth: parseFloat(room.breadth) || 0,
            })),
          };
        } catch (err) {
          return res.status(400).json({
            message: "Invalid dimensions format",
            error: err.message,
          });
        }
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

      // Validate availabilityTime (ensure it matches the expected format)
      if (!timeFormatRegex.test(availabilityTime)) {
        return res.status(400).json({
          message:
            "Invalid availability time format. Use formats like '1pm-2pm', 'between 1pm-2pm', or 'after 2pm'.",
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
        availableStart: startDate, // Convert to Date object
        availableEnd: endDate,
        availabilityTime,
        userId: req.user.id,
        entityType,
        dimensions: parsedDimensions,
      };

      const newProperty = await Property.create(propertyData);
      // Save room dimensions to the Room table
      // if (parsedRooms && parsedRooms.length > 0) {
      //   await Promise.all(
      //     parsedRooms.map((room) =>
      //       Room.create({
      //         propertyId: newProperty.id,
      //         roomType: room.roomType,
      //         length: room.length,
      //         width: room.width,
      //       })
      //     )
      //   );
      // }

      const imagesDirectory = path.join(__dirname, "uploads/properties/images");
      if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory, { recursive: true });
      }

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
              file_type: "image",
              entityType: "property",
              vehicleId: null,
            }).catch((err) => {
              console.log("Error saving image to Media:", err);
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
              file_type: "video",
              entityType: "property",
              vehicleId: null,
            }).catch((err) => {
              console.log("Error saving video to Media:", err);
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
      console.log(error, "érqw3434");
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
          attributes: ["id", "firstName", "email"],
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

    const baseUrl = "http://localhost:3002"; // Base URL for files

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
          attributes: [
            "id",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "email",
          ],
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
    const baseUrl = "http://localhost:3002"; // Base URL for files
    if (property.media) {
      property.media.forEach((mediaItem) => {
        const filePath = mediaItem.file_path.replace(/\\/g, "/"); // Ensure path formatting is consistent
        mediaItem.file_path = `${baseUrl}/${filePath}`; // Construct full URL
      });
    }

    res.status(200).json({
      id: property.id,
      description: property.description,
      houseRule: property.houseRule,
      category: property.category,
      locationCity: property.locationCity,
      locationStreetNumber: property.locationStreetNumber,
      StreetName: property.StreetName,
      numOfSpaces: property.numOfSpaces,
      numOfBedrooms: property.numOfBedrooms,
      numOfLivingrooms: property.numOfLivingrooms,
      numOfKitchens: property.numOfKitchens,
      numOfBathrooms: property.numOfBathrooms,
      floor: property.floor,
      features: property.features,
      dimensions: property.dimensions,
      monthlyRent: property.monthlyRent,
      advancedRent: property.advancedRent,
      media: property.media,
      availabilityTime: property.availabilityTime, // Corrected to fetch from property itself
      availableStart: property.availableStart,
      availableEnd: property.availableEnd,
      landlord: {
        id: property.User.id,
        firstName: property.User.firstName,
        lastName: property.User.lastName,
        address: property.User.address,
        email: property.User.email,
        phoneNumber: property.User.phoneNumber, // Ensure this exists in the `User` table
      },
    });
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving property", error });
  }
});

router.get("/:type", async (req, res) => {
  const { type } = req.params;
  const validTypes = ["flat", "room", "apartment"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid property type." });
  }

  try {
    const properties = await Property.findAll({ where: { type } });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error." });
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
