// controllers/ratingController.js
const { Rating, Users, Property, Vehicle } = require("../models");

exports.addRating = async (req, res) => {
  const { rating_value, review_text, rating_type, target_id, rater_id } = req.body;

  try {
    // Validate rating_type
    if (!['property', 'vehicle', 'landlord', 'vehicle_supplier', 'tenant', 'test'].includes(rating_type)) {
      return res.status(400).json({ error: 'Invalid rating type' });
    }

    // Verify target_id exists in the correct table based on rating_type
    let targetExists = false;
    switch (rating_type) {
      case 'property':
        targetExists = await Property.findByPk(target_id); // Check if Property exists
        break;
      case 'vehicle':
        targetExists = await Vehicle.findByPk(target_id); // Check if Vehicle exists
        break;
      case 'test':
        targetExists = await Test.findByPk(target_id); // Check if Test exists
        break;
        
      // Add more cases for landlord, tenant, and vehicle_supplier if necessary
    }

    if (!targetExists) {
      return res.status(400).json({ error: `No ${rating_type} found with ID ${target_id}` });
    }

    // Create the new rating
    const newRating = await Rating.create({
      rating_value,
      review_text,
      rating_type,
      target_id,
      rater_id,
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getUserRatings = async (req, res) => {
  const { userId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: {
        target_id: userId,
        rating_type: ["tenant", "landlord", "vehicle_supplier"],
      },
      include: [
        { model: Users, as: "rater", attributes: ["name", "profileImage"] },
      ],
    });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating_value, 0) /
        ratings.length || 0;

    res.status(200).json({ ratings, averageRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user ratings" });
  }
};

exports.getPropertyRatings = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: { target_id: propertyId, rating_type: "property" },
      include: [
        { model: Users, as: "rater", attributes: ["name", "profileImage"] },
      ],
    });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating_value, 0) /
        ratings.length || 0;

    res.status(200).json({ ratings, averageRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property ratings" });
  }
};

exports.getVehicleRatings = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: { target_id: vehicleId, rating_type: "vehicle" },
      include: [
        { model: Users, as: "rater", attributes: ["name", "profileImage"] },
      ],
    });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating_value, 0) /
        ratings.length || 0;

    res.status(200).json({ ratings, averageRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle ratings" });
  }
};

exports.getTestRatings = async (req, res) => {
  const { testId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: { target_id: testId, rating_type: "test" },
      include: [
        { model: Users, as: "rater", attributes: ["name", "profileImage"] },
      ],
    });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating_value, 0) /
        ratings.length || 0;

    res.status(200).json({ ratings, averageRating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property ratings" });
  }
};
