const mongoose = require('mongoose');
const { Schema } = mongoose;

const hospitalSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      latitude: {
        type: String,
        required: true
      },
      longitude: {
        type: String,
        required: true
      }
    },
    ambulances: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ambulance'
    }]
  });

  module.exports = mongoose.model('Hospital', hospitalSchema);