const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PropertyRouter = require("./routes/Property");
const UserRouter = require("./routes/Users");
const vehicleRouter = require("./routes/Vehicle");
const path = require("path");
const bodyParser = require("body-parser");
const bookingRouter = require("./routes/Booking");
const RatingRouter = require("./routes/Rating");
const contactRouter = require("./routes/Contact");
const SavePropertyRouter = require("./routes/SavedProperties");
const ChangePasswordRouter = require("./routes/ChangePassword");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve property images
app.use(
  "/uploads/properties/images",
  express.static(path.join(__dirname, "uploads/properties/images"))
);

// Serve property videos
app.use(
  "/uploads/properties/videos",
  express.static(path.join(__dirname, "uploads/properties/videos"))
);

// Serve vehicle images
app.use(
  "/uploads/vehicles/images",
  express.static(path.join(__dirname, "uploads/vehicles/images"))
);

// Serve vehicle videos
app.use(
  "/uploads/vehicles/videos",
  express.static(path.join(__dirname, "uploads/vehicles/videos"))
);

// Routes
const db = require("./models");

app.use("/properties", PropertyRouter);
app.use("/auth", UserRouter);
app.use("/vehicle", vehicleRouter);
app.use("/booking", bookingRouter);

app.use("/rating", RatingRouter);

app.use("/contact", contactRouter);
app.use("/changepassword", ChangePasswordRouter);
app.use("/save-property", SavePropertyRouter);
db.sequelize.sync().then(() => {
  app.listen(5001, () => {
    console.log("Server Running on port 5001");
  });
});
