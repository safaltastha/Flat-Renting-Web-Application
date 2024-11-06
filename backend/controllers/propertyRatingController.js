const { PropertyRating, Users, Property,sequelize } = require('../models');

// Create a new rating
exports.createPropertyRating = async (req, res) => {
  try {
    const { rating_value, review_text, property_id, rater_id } = req.body;
    const newRating = await PropertyRating.create({
      rating_value,
      review_text,
      property_id,
      rater_id
    });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get property details with average rating
exports.getPropertyWithAverageRating = async (req, res) => {
    try {
      const { property_id } = req.params;
  
      const property = await Property.findOne({
        where: { id: property_id },
        include: [
          {
            model: PropertyRating,
            attributes: [
              [sequelize.fn('AVG', sequelize.col('rating_value')), 'averageRating'],
            ],
          },
        ],
      });
  
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// // Update a rating
exports.updatePropertyRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating_value, review_text } = req.body;
    const rating = await PropertyRating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // If fields are empty, do not update them
    if (rating_value) rating.rating_value = rating_value;
    if (review_text) rating.review_text = review_text;

    await rating.save();

    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Delete a rating
exports.deletePropertyRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await PropertyRating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    await rating.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
