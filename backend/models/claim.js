const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const claimSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "processed", "rejected"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const claimsModel = mongoose.model("claims", claimSchema);

module.exports = claimsModel;
