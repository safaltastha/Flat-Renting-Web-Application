const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({ message: "Registration successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  res.json("YOU LOGGED IN!!!");
});

module.exports = router;
