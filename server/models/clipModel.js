const mongoose = require("mongoose");
const { Schema } = mongoose;

const clipboardSchema = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },

    // This field determines when the document will expire
    expiryTimestamp: {
      type: Date,
      default: () => Date.now() + (60 * 60 * 1000), // 1 hour from creation
      index: { expires: 0 }, // TTL index → expires at the time of expiryTimestamp
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields automatically
);

const Clipboard = mongoose.model("Clipboard", clipboardSchema);

module.exports = Clipboard;
