const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  pricing: {
    type: Number,
    required: false,
  },
  hosts: {
    type: Array,
    required: true,
  },
});
