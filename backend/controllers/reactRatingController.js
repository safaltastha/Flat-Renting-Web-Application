const { RatingReactions, Rating, Users } = require("../models"); // Adjust path if not from index.js

exports.addReaction = async (req, res) => {
  const { ratingId, reaction } = req.body;
  const userId = req.user.id;

  try {
    // Validate input
    if (!userId || !ratingId || !reaction) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if a reaction already exists
    const existingReaction = await RatingReactions.findOne({
      where: { userId, ratingId },
    });

    let reactionRecord;

    if (existingReaction) {
      // Update the reaction if it exists
      reactionRecord = await existingReaction.update({ reaction });
    } else {
      // Create a new reaction
      reactionRecord = await RatingReactions.create({
        userId,
        ratingId,
        reaction,
      });
    }

    res.status(201).json({
      message: "Reaction added or updated successfully",
      reaction: reactionRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getReactionsCount = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const likeCount = await RatingReactions.count({
      where: { ratingId, reaction: "like" },
    });

    const dislikeCount = await RatingReactions.count({
      where: { ratingId, reaction: "dislike" },
    });

    res.status(200).json({ likeCount, dislikeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.toggleReaction = async (req, res) => {
  const { ratingId, reaction } = req.body;
  const userId = req.user.id;

  try {
    // Validate input
    if (!userId || !ratingId || !reaction) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if a reaction already exists
    const existingReaction = await RatingReactions.findOne({
      where: { userId, ratingId },
    });

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        // If the same reaction exists, remove it (toggle off)
        await existingReaction.destroy();
        return res
          .status(200)
          .json({ message: "Reaction removed successfully." });
      } else {
        // If a different reaction exists, update it
        const updatedReaction = await existingReaction.update({ reaction });
        return res.status(200).json({
          message: "Reaction updated successfully.",
          reaction: updatedReaction,
        });
      }
    } else {
      // If no reaction exists, create a new one
      const newReaction = await RatingReactions.create({
        userId,
        ratingId,
        reaction,
      });
      return res.status(201).json({
        message: "Reaction added successfully.",
        reaction: newReaction,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Route to get total likes and dislikes for a rating
exports.getRatingAndReactions = async (req, res) => {
  const { ratingId } = req.params;

  try {
    // Count the number of likes and dislikes for the given ratingId
    const likeCount = await RatingReactions.count({
      where: {
        ratingId: ratingId,
        reaction: "like", // assuming 'like' is stored as a string in the reaction column
      },
    });

    const dislikeCount = await RatingReactions.count({
      where: {
        ratingId: ratingId,
        reaction: "dislike", // assuming 'dislike' is stored as a string in the reaction column
      },
    });

    // Respond with the counts
    res.status(200).json({
      likeCount,
      dislikeCount,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching reactions", error: error.message });
  }
};
