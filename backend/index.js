const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PropertyRouter = require("./routes/Property");
const UserRouter = require("./routes/Users");
const vehicleRouter = require("./routes/Vehicle");
const path = require("path");
const bookTestRouter = require("./routes/BookTest");
const bookingRouter = require("./routes/Booking");
const TestRouter = require("./routes/Test");
const RatingRouter = require("./routes/Rating");
const propertyRatingRouter = require("./routes/PropertyRating");
const vehicleRatingRouter = require("./routes/VehicleRating");
const userRatingRouter = require("./routes/UserRating");


app.use(express.json());
app.use(cookieParser());

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
app.use("/bookTest", bookTestRouter);
app.use("/test", TestRouter);
app.use("/rating", RatingRouter);
app.use("/property-ratings", propertyRatingRouter);
app.use("/vehicle-ratings", vehicleRatingRouter);
app.use("/user-ratings", userRatingRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running on port 3001");
  });
});
