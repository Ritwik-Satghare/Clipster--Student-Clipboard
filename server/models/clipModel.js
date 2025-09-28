const mongoose = require("mongoose");
const { Schema } = mongoose;

const clipboardSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: { type: Date, default: Date.now, expires: 180 },
    expiryTimestamp: {
      type: Date,
      default: Date.now() +3*60*1000, // 3 minutes 
    },
  },
  { timestamps: true }
);

const Clipboard = mongoose.model("Clipboard", clipboardSchema);

module.exports = Clipboard;
