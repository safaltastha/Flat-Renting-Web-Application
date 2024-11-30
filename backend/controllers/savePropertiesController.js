const { SavedProperties, Property, Users } = require("../models");

exports.saveProperty = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  if (!userId || !propertyId) {
    return res
      .status(400)
      .json({ error: "userId and propertyId are required" });
  }

  try {
    // Check if the property is already saved
    const alreadySaved = await SavedProperties.findOne({
      where: { userId, propertyId },
    });

    if (alreadySaved) {
      return res.status(409).json({ message: "Property already saved!" });
    }

    // Save the property
    const savedProperty = await SavedProperties.create({ userId, propertyId });
    return res
      .status(201)
      .json({ message: "Property saved successfully!", savedProperty });
  } catch (error) {
    console.error("Error saving property:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSavedProperties = async (req, res) => {
  const userId = req.user.id; // Extract the user ID from the authenticated request

  try {
    // Find all properties saved by the user
    const savedProperties = await Users.findOne({
      where: { id: userId },
      include: [
        {
          model: Property,
          as: "savedProperties", // Alias defined in the User model association
          attributes: ["id"], // Select desired attributes
          through: {
            attributes: [], // Exclude SavedProperties intermediate table attributes
          },
        },
      ],
    });

    if (!savedProperties || savedProperties.savedProperties.length === 0) {
      return res.status(404).json({ message: "No saved properties found." });
    }

    return res
      .status(200)
      .json({ savedProperties: savedProperties.savedProperties });
  } catch (error) {
    console.error("Error retrieving saved properties:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.unsaveProperty = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.id; // Extract the user ID from the authenticated request

  if (!propertyId) {
    return res.status(400).json({ error: "propertyId is required" });
  }

  try {
    // Check if the property is saved
    const savedProperty = await SavedProperties.findOne({
      where: { userId, propertyId },
    });

    if (!savedProperty) {
      return res
        .status(404)
        .json({ message: "Property not found in saved list." });
    }

    // Delete the saved property
    await SavedProperties.destroy({ where: { userId, propertyId } });
    return res.status(200).json({ message: "Property unsaved successfully!" });
  } catch (error) {
    console.error("Error unsaving property:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
