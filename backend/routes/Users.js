// routes/users.js
const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

//logout route
router.post('/logout', authenticateJWT, logout);

router.get("/role", authenticateJWT, (req, res) => {
  res.json({ role: req.user.role }); 
});


module.exports = router;
