const express = require("express");
const router = express.Router();
const { Test } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");

router.post("/", authenticateJWT, async (req, res) => {
  // Destructure properties from req.body
  const { category} = req.body;

  try {
    const propertyData = {
      category,
      userId: req.user.id,
    };

    // Use the correct model `Test` to create the property
    const newProperty = await Test.create(propertyData);
    console.log("New Property:", newProperty);


    res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
});

module.exports = router;
