const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: { type: Date},

  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  longitudeUser:{
    type: Number,
  },
  latitudeUser:{
    type: Number,
  }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);