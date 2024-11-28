const { Property, Users, Media } = require("../models");
const { Op } = require("sequelize"); // Import Sequelize operators

// Controller to search properties based on query parameters and include media
const searchProperties = async (req, res) => {
  console.log("Search Properties function called");
  try {
    const { category, locationCity, priceRange } = req.query;
    let whereClause = {};

    // Build where clause based on provided filters
    if (category) whereClause.category = category;
    if (locationCity) {
      // Replace spaces in the locationCity query for flexible matching
      const sanitizedLocation = locationCity.replace(/\s+/g, "");
      whereClause.locationCity = {
        [Op.like]: `%${sanitizedLocation}%`,
      };
    }

    if (priceRange) {
      const [minRent, maxRent] = priceRange.split("-").map(Number);
      if (!isNaN(minRent) && !isNaN(maxRent)) {
        whereClause.monthlyRent = { [Op.between]: [minRent, maxRent] };
      }
    }

    // Query database for matching properties and include media and user data
    const properties = await Property.findAll({
      where: whereClause,
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
          required: false,
        },
      ],
    });

    const baseUrl = "http://localhost:3002"; // Base URL for files

    // Format media file paths for response
    properties.forEach((property) => {
      if (property.media) {
        property.media.forEach((mediaItem) => {
          const filePath = mediaItem.file_path.replace(/\\/g, "/"); // Ensure path formatting is consistent
          if (mediaItem.file_type === "image") {
            mediaItem.file_path = `${baseUrl}/${filePath}`;
          } else if (mediaItem.file_type === "video") {
            mediaItem.file_path = `${baseUrl}/${filePath}`;
          }
        });
      }
    });

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

module.exports = { searchProperties };
