const { Rating, Property, Users, Vehicle } = require("../models");

// Create a rating or review for a property or vehicle
exports.createRating = async (req, res) => {
  const { score, comment, propertyId, vehicleId } = req.body;
  const userId = req.user.id; // Assume user ID is extracted from the authenticated request

  try {
    // Ensure at least one of propertyId or vehicleId is provided
    if (!propertyId && !vehicleId) {
      return res.status(400).json({
        error: "You must provide either a propertyId or a vehicleId.",
      });
    }

    const newRating = await Rating.create({
      score,
      comment,
      propertyId: propertyId || null,
      vehicleId: vehicleId || null,
      userId,
    });

    res.status(201).json({
      message: "Rating created successfully.",
      data: newRating,
    });
  } catch (error) {
    console.error("Error creating rating:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the rating." });
  }
};

// Get all ratings

// Get ratings for either a property or a vehicle
exports.getRatingById = async (req, res) => {
  try {
    const { propertyId, vehicleId } = req.query; // Get propertyId or vehicleId from query parameters

    if (!propertyId && !vehicleId) {
      return res
        .status(400)
        .json({ message: "Please provide either propertyId or vehicleId." });
    }

    let ratings;
    if (propertyId) {
      // Get ratings for property
      ratings = await Rating.findAll({
        where: { propertyId },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "email"],
          },
          {
            model: Property,
            as: "property",
            attributes: [
              "id",
              "locationCity",
              "locationStreetNumber",
              "StreetName",
            ],
          },
        ],
      });
    } else if (vehicleId) {
      // Get ratings for vehicle
      ratings = await Rating.findAll({
        where: { vehicleId },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "email"],
          },
          {
            model: Vehicle,
            as: "vehicle",
            attributes: ["id", "type", "registrationNumber"],
          },
        ],
      });
    }

    // Check if ratings exist and return specific error messages
    if (!ratings || ratings.length === 0) {
      if (propertyId) {
        return res.status(404).json({
          message: "No ratings found for the given property.",
        });
      } else if (vehicleId) {
        return res.status(404).json({
          message: "No ratings found for the given vehicle.",
        });
      }
    }

    return res.status(200).json(ratings);
  } catch (err) {
    console.error("hello", err);
    return res.status(500).json({ message: "Server error." });
  }
};
