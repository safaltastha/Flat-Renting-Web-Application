const { Property } = require("../models");
const { Op } = require("sequelize"); // Import Sequelize operators

// Controller to search properties based on query parameters
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

    // Query database for matching properties
    const properties = await Property.findAll({ where: whereClause });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

module.exports = { searchProperties };
