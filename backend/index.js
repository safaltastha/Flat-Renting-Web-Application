const express = require("express");
const app = express();
const cors=require('cors');

app.use(express.json()); 
app.use(cors());

const db = require("./models");



const PropertyRouter=require('./routes/Property');
app.use("/properties",PropertyRouter);

const UserRouter=require('./routes/Users');
app.use("/auth",UserRouter);


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running on port 3001");
  });
});