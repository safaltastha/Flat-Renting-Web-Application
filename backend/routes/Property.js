const express = require("express");
const path = require("path");
const router = express.Router();
const { Property, Media, Users } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");

//Post properties
router.post(
  "/",
  authenticateJWT,
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  async (req, res) => {
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
    } = req.body;

    try {
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
        features: JSON.parse(features),
        description,
        houseRule,
        userId: req.user.id,
      };

      // Create the property
      const newProperty = await Property.create(propertyData);

      // Handle image uploads
      if (req.files["image"]) {
        const imagePaths = req.files["image"].map((file) =>
          path.join("uploads/images", file.filename)
        );

        // Save each image path to the Media table
        await Promise.all(
          imagePaths.map((filePath) =>
            Media.create({
              propertyId: newProperty.id,
              file_path: filePath,
              file_type: "image", // Change mediaType to file_type and set value to "image"
            })
          )
        );
      }

      // Handle video uploads
      if (req.files["video"]) {
        const videoPaths = req.files["video"].map((file) =>
          path.join("uploads/videos", file.filename)
        );

        // Save each video path to the Media table
        await Promise.all(
          videoPaths.map((filePath) =>
            Media.create({
              propertyId: newProperty.id,
              file_path: filePath,
              file_type: "video", // Change mediaType to file_type and set value to "video"
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
router.get("/", async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
        {
          model: Media,
          as: "media", // This should match the alias you used in the Property model
          attributes: ["file_path", "file_type"],
        },
      ],
    });
    res.json(properties);
  } catch (error) {
    console.error("Database Error:", error); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving properties", error });
  }
});


// Get a property by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
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

      if (req.files.length > 0) {
        const imagePaths = req.files
          .filter((file) => file.mimetype.startsWith("image/"))
          .map((file) => path.join("uploads/images", file.filename));

        const videoPaths = req.files
          .filter((file) => file.mimetype.startsWith("video/"))
          .map((file) => path.join("uploads/videos", file.filename));

        updatedData.photo = imagePaths;
        updatedData.video = videoPaths;
      }

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

    await property.destroy();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
});

//  Search on category, location, priceRange
router.get("/search", async (req, res) => {
  const { category, location, priceRange } = req.query;

  // Build the query conditions
  const conditions = {};

  if (category) {
    conditions.category = category; // Match category
  }

  if (location) {
    conditions.locationCity = { $like: `%${location}%` }; // Use LIKE for location matching
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    conditions.monthlyRent = {
      $gte: minPrice,
      $lte: maxPrice,
    }; // Filter by price range
  }

  try {
    const properties = await Property.findAll({
      where: conditions,
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving properties", error });
  }
});

module.exports = router;
