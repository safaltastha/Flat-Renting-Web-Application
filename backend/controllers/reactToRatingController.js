// controllers/ratingController.js
const { Rating, RatingReactions, Users } = require("../models");

// Add Like/Dislike for a Rating
exports.reactToRating = async (req, res) => {
  const { ratingId } = req.params; // Rating ID from the URL
  const { type } = req.body; // "like" or "dislike"
  const userId = req.user.id; // Assuming user ID comes from authenticated request

  if (!["like", "dislike"].includes(type)) {
    return res.status(400).json({ message: "Invalid reaction type." });
  }

  try {
    // Check if the user has already reacted to this rating
    let existingReaction = await RatingReactions.findOne({
      where: {
        ratingId,
        userId,
      },
    });

    if (existingReaction) {
      // If the user has already reacted, update the reaction
      existingReaction.type = type;
      await existingReaction.save();
      return res
        .status(200)
        .json({ message: "Reaction updated successfully." });
    }

    // Otherwise, create a new reaction
    const newReaction = await RatingReactions.create({
      ratingId,
      userId,
      type,
    });

    res
      .status(201)
      .json({ message: "Reaction added successfully.", data: newReaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reaction." });
  }
};
