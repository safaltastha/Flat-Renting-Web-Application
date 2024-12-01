// controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require("dotenv").config();

// Registration handler
exports.register = async (req, res) => {
  const { firstName, lastName, address, email, password, role, phoneNumber } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        role: newUser.role,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 86400000,
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
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        role: user.role,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 86400000,
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

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, address, email, password, role, phoneNumber } =
    req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
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

const JWT_SECRET = "Laravel1$";

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const oldUser = await Users.findOne({ where: { email } });
    if (!oldUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Create a unique token secret using the user's password
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser.id }, // Payload
      secret, // Unique secret for added security
      { expiresIn: "1h" }
    );

    // Generate reset password link
    const link = `http://localhost:3002/auth/reset-password/${oldUser.id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pranisha.joshi11@gmail.com",
        pass: "kire evax novg gfuy",
      },
    });

    var mailOptions = {
      from: `"Basai Sarai" <pranisha.joshi11@gmail.com>`, // Display name with your email
      to: oldUser.email, // Landlord's email fetched from the database
      subject: "Password Reset Request",
      text: `Hello ${oldUser.firstName},\n\nClick the link below to reset your password:\n\n${link}\n\nThanks,\nBasai Sarai Team`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log("Password reset link:", link);

    // Send response
    return res.status(200).json({ message: "Password reset link sent", link });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Reset password using token
exports.resetPassword = async (req, res) => {
  const { token, id } = req.params;
  console.log(req.params);
  const oldUser = await Users.findOne({ where: { id } });
  if (!oldUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not verified");
  }
};

exports.resetPasswordd = async (req, res) => {
  const { token, id } = req.params;
  const { password } = req.body;

  const oldUser = await Users.findOne({ where: { id } });
  if (!oldUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Users.update(
      { password: encryptedPassword }, // Update the password field
      { where: { id } } // Condition to find the user by id
    );
    
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something went wrong" });
  }
};

// Logout handler
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
