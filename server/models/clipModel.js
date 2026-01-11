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
      default: () => Date.now() + (15 * 60 * 1000), // 15 minutes from creation
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields automatically
);
clipboardSchema.index({ expiryTimestamp: 1 }, { expireAfterSeconds: 0 }); // 15 minutes after creation

// Create the model from the schema and export it

const Clipboard = mongoose.model("Clipboard", clipboardSchema);

module.exports = Clipboard;
