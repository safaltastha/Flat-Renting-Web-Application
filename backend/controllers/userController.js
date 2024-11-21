// controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, UserRating } = require("../models");
require("dotenv").config();

// Registration handler
exports.register = async (req, res) => {
  const { name, email, password, role, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({ message: "Registration successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User doesn't exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Get user by ID

// Function to calculate average rating for a user
const calculateAverageRating = async (userId) => {
  const ratings = await UserRating.findAll({
    where: { rated_user_id: userId },
  });

  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce(
    (acc, rating) => acc + rating.rating_value,
    0
  );

  // Calculate average rating
  const averageRating =
    totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;

  return averageRating;
};

// Get user profile along with average rating
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user details from the database
    const user = await Users.findByPk(id, {
      attributes: ["id", "name", "role"], // Selecting specific attributes
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate average rating of the user
    const averageRating = await calculateAverageRating(id);

    // Return user details and average rating
    res.json({
      user,
      averageRating, // Include average rating in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phoneNumber } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Login handler

// Logout handler
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
