const { Rating, Property, Users, Vehicle } = require("../models");

// Create a rating or review for a property or vehicle
exports.createRating = async (req, res) => {
  const { score, review, propertyId, vehicleId } = req.body;
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
      review,
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

// Get ratings for either a property or a vehicle
exports.getRatingById = async (req, res) => {
  try {
    const { propertyId, vehicleId } = req.query;

    // Validate input: Ensure only one ID type is being queried at a time
    if (!propertyId && !vehicleId) {
      return res
        .status(400)
        .json({ message: "Please provide either propertyId or vehicleId." });
    }
    if (propertyId && vehicleId) {
      return res.status(400).json({
        message:
          "Please provide only one identifier: propertyId or vehicleId, not both.",
      });
    }

    let ratings;

    if (propertyId) {
      // Fetch ratings for a property
      ratings = await Rating.findAll({
        where: { propertyId },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: Property,
            as: "property",
            attributes: ["id", "category"],
          },
        ],
      });
    } else if (vehicleId) {
      // Fetch ratings for a vehicle
      ratings = await Rating.findAll({
        where: { vehicleId },
        include: [
          {
            model: Users,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          {
            model: Vehicle,
            as: "vehicle",
            attributes: ["id", "type", "registrationNumber"],
          },
        ],
      });
    }

    // Check if ratings exist
    if (!ratings || ratings.length === 0) {
      const message = propertyId
        ? "No ratings found for the given property."
        : "No ratings found for the given vehicle.";
      return res.status(404).json({ message });
    }

    return res.status(200).json(ratings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// Get all ratings

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      include: {
        model: Users,
        as: "user", // Alias defined in the association
        attributes: ["id"], // Fetch only required fields
      },
    });

    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch ratings and reviews" });
  }
};

exports.editReview = async (req, res) => {
  try {
    const ratingId = req.params.id; // Rating ID from URL params
    const { review, propertyId, vehicleId } = req.body; // Review text and propertyId/vehicleId from body
    const userId = req.user.id; // The user performing the action (from JWT)

    // Validate input
    if (!review || (!propertyId && !vehicleId)) {
      return res.status(400).json({
        message: "Review text and either propertyId or vehicleId are required.",
      });
    }

    // Determine if it's a property review or vehicle review
    let rating;
    if (propertyId) {
      // It's a property review
      rating = await Rating.findOne({
        where: { id: ratingId },
        include: [
          {
            model: Property,
            as: "property",
            where: { id: propertyId }, // Ensure the review is for the given propertyId
          },
        ],
      });
    } else if (vehicleId) {
      // It's a vehicle review
      rating = await Rating.findOne({
        where: { id: ratingId },
        include: [
          {
            model: Vehicle,
            as: "vehicle",
            where: { id: vehicleId }, // Ensure the review is for the given vehicleId
          },
        ],
      });
    }

    // Check if the rating exists
    if (!rating) {
      return res.status(404).json({
        message: "Review not found for the given property or vehicle.",
      });
    }

    // Ensure the user can only edit their own review
    if (rating.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own review." });
    }

    // Update the review text
    rating.review = review;
    await rating.save();

    // Respond with the updated review
    return res.status(200).json({
      message: "Review updated successfully.",
      rating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const ratingId = req.params.id; // Rating ID from URL params
    const { propertyId, vehicleId } = req.body; // Property or Vehicle ID from request body
    const userId = req.user.id; // User performing the deletion (from JWT)

    // Validate input
    if (!propertyId && !vehicleId) {
      return res
        .status(400)
        .json({ message: "Please provide either propertyId or vehicleId." });
    }

    // Find the review by ID
    let rating;
    if (propertyId) {
      // It's a property review
      rating = await Rating.findOne({
        where: { id: ratingId },
        include: [
          {
            model: Property,
            as: "property",
            where: { id: propertyId }, // Ensure the review is for the given propertyId
          },
        ],
      });
    } else if (vehicleId) {
      // It's a vehicle review
      rating = await Rating.findOne({
        where: { id: ratingId },
        include: [
          {
            model: Vehicle,
            as: "vehicle",
            where: { id: vehicleId }, // Ensure the review is for the given vehicleId
          },
        ],
      });
    }

    // Check if the rating exists
    if (!rating) {
      return res.status(404).json({
        message: "Review not found for the given property or vehicle.",
      });
    }

    // Ensure the user can only delete their own review
    if (rating.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own review." });
    }

    // Delete the review
    await rating.destroy();

    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
