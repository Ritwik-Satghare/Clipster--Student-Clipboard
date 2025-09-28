const express = require("express");
const { test, registerUser, loginUser } = require("../controllers/authController");
const mongoose = require("mongoose");

const router = express.Router();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to user DB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB (user DB):", error);
  });


router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = { router };
