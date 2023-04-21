const mongoose = require("mongoose");
const Schema = mongoose.Schema
const claimSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  userId: { type: Schema.Types.ObjectId,
     ref: 'User',
    required:true,
},
    status: {
        type: String,
        enum: ['pending', 'processed', 'rejected'],
        default: 'pending',
        required: true,}
});
const claimsModel = mongoose.model("claims", claimSchema);

module.exports = claimsModel;