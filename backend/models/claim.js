const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const claimSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
    },

    description: {
      type: String,

    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "processed", "rejected"],
      default: "pending",

    },
  },
  {
    timestamps: true,
  }
);
const claimsModel = mongoose.model("claims", claimSchema);

module.exports = claimsModel;
