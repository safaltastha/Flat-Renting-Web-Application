const { VehicleRating, Users, Vehicle, sequelize } = require("../models");

// Create a new rating
exports.createVehicleRating = async (req, res) => {
  try {
    const { rating_value, review_text, vehicle_id } = req.body;
    const rater_id = req.user.id;

    // Basic validation
    if (!rating_value || !review_text || !vehicle_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (rating_value < 1 || rating_value > 5) {
      return res
        .status(400)
        .json({ error: "Rating value must be between 1 and 5" });
    }

    const newRating = await VehicleRating.create({
      rating_value,
      review_text,
      vehicle_id,
      rater_id,
    });
    res.status(200).json({ message: "Vehicle rated successfully", newRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get property details with average rating

exports.getVehicleWithAverageRating = async (req, res) => {
  try {
    const { vehicle_id } = req.params;

    // Calculate average rating separately
    const averageRatingData = await VehicleRating.findOne({
      where: { vehicle_id },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating_value")), "averageRating"],
      ],
      raw: true,
    });

    // Fetch vehicle details
    const vehicle = await Vehicle.findOne({
      where: { id: vehicle_id },
      include: [
        {
          model: VehicleRating,
          as: "ratings",
          // Only include specific fields if necessary or leave empty to avoid redundant data
          attributes: ["id", "rating_value", "review_text", "rater_id"],
        },
      ],
    });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // Combine average rating with vehicle data
    const vehicleWithAverageRating = {
      ...vehicle.toJSON(),
      averageRating: averageRatingData ? averageRatingData.averageRating : null,
    };

    res.json(vehicleWithAverageRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Update a rating
exports.updateVehicleRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating_value, review_text } = req.body;
    const rating = await VehicleRating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    // If fields are empty, do not update them
    if (rating_value) rating.rating_value = rating_value;
    if (review_text) rating.review_text = review_text;

    await rating.save();

    res.json({ message: "Vehicle rating updated sucessfully", rating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Delete a rating
exports.deleteVehicleRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await VehicleRating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    await rating.destroy();
    res.status(200).send({message:"Rating deleted successfully",rating});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
