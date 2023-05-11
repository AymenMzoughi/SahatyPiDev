const mongoose = require("mongoose");
const { Schema } = mongoose;
const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    
    doctorId: { type: Schema.Types.ObjectId, ref: 'User' },
   
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",

    },
 
    type: { type: String, enum: ['online', 'faceToFace'],required:true },
  },
  {
    timestamps: true,
  }
  
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;