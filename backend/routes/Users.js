// routes/users.js
const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsers,

  updateUser,
  deleteUser,
  requestPasswordReset,
  resetPassword,
  resetPasswordd,
} = require("../controllers/userController");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const router = express.Router();

// Registration route
router.post("/register", register);

// Login route
router.post("/login", login);

// get role
router.get("/role", authenticateJWT, (req, res) => {
  res.json({ role: req.user.role });
});

// Get all users route
router.get("/", authenticateJWT, getAllUsers);

// Update user route
router.put("/update/:id", authenticateJWT, updateUser);

// Delete user route
router.delete("/delete/:id", authenticateJWT, deleteUser);

//logout route
router.post("/logout", authenticateJWT, logout);

router.post("/forgot-password", requestPasswordReset);

router.get("/reset-password/:id/:token", resetPassword);

router.post("/reset-password/:id/:token", resetPasswordd);

module.exports = router;
