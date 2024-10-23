const express = require('express');
const router = express.Router();
const { Test, Users } = require('../models');
const upload = require('../middlewares/multerConfig'); 
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Create a new property (with image and video upload)
router.post('/', authenticateJWT, upload.fields([
  { name: 'image', maxCount: 10 }, 
  { name: 'video', maxCount: 5 } 
]), async (req, res) => {
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
    const imagePaths = req.files['image'] 
      ? req.files['image'].map(file => path.join('uploads/images', file.filename))
      : [];

    const videoPaths = req.files['video'] 
      ? req.files['video'].map(file => path.join('uploads/videos', file.filename))
      : [];

    const testData = {
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
      photo: imagePaths,
      video: videoPaths,
      userId: req.user.id, 
    };

    const newTest = await Test.create(testData);
    res.status(201).json({ message: 'Property created successfully', test: testProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
});
module.exports = router;