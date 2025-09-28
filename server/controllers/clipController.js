const clipModel = require("../models/clipModel");
const generateCode = require("../helpers/generateCode");

const createClip = async (req, res) => {
  try {
    const { ownerName, text, tags} = req.body;
    if (typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }
    const code = generateCode();
    const newClip = await clipModel.create({
      ownerName, // assuming ownerName is provided in the request body
      text: text.trim(),
      code,
      tags,
    });
    res.status(200).json({
      success: "Clipboard created successfully",
      Clipboard: newClip,
    });
  } catch (error) {
    console.log("Error creating clipboard: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getClipByCode = async (req, res) => {
  try {
    const { code } = req.params;

    // Find clip by code
    const clip = await clipModel.findOne({ code });

    if (!clip) {
      return res.status(404).json({ success: false, message: "clipModel not found" });
    }

    // Check if clip is expired
    const now = new Date();
    if (clip.expiryTimestamp && clip.expiryTimestamp < now) {
      return res.status(410).json({ success: false, message: "clipModel expired" });
    }

    // Return clip text
    res.json({
      success: true,
      Clipboard: {
        text: clip.text,
        ownerName: clip.ownerName,
        code: clip.code,
        expiryTimestamp: clip.expiryTimestamp || "never",
      },
    });

  } catch (error) {
    console.error("Error fetching clip by code:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = { createClip, getClipByCode};
