const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PropertyRouter = require("./routes/Property");
const UserRouter = require("./routes/Users");
const testRouter = require("./routes/Test");

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

// Routes
const db = require("./models");

app.use("/properties", PropertyRouter);
app.use("/auth", UserRouter);
app.use("/test", testRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running on port 3001");
  });
});
