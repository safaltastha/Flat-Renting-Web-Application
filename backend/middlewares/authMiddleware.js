// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  console.log("Token in middleware:", token);

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
