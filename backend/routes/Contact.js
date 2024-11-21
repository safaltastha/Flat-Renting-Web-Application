const express = require("express");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const { submitContactForm } = require("../controllers/contactController");
const router = express.Router();



router.post('/',authenticateJWT,submitContactForm);
module.exports = router;