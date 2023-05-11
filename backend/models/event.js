const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hosts: {
    type: Array,
    required: false,
  },
});
const eventModel = mongoose.model("Events", eventSchema);
module.exports = eventModel;