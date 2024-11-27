const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateJWT, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match." });
  }
  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters long." });
  }

  try {
    // Get the user's ID from the token (set by auth middleware)
    const userId = req.user.id;

    // Find the user in the database
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password matches the one in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

module.exports = router;
