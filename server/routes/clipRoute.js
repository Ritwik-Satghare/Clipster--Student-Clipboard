const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { createClip, getClipByCode } = require("../controllers/clipController");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to clip DB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB (clip DB):", error);
  });

router.post("/clipboard", createClip);
router.get("/clipboard/:code", getClipByCode);
// router.delete("/clipboard/:code", deleteClipByCode);

module.exports = { clipRouter: router }; // Exporting as clipRouter to avoid naming conflicts