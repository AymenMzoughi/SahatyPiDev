const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  hospital: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  createdAt: { type: Date},
  latitude: {
    type: Number,

  },
  longitude: {
    type: Number,

  },
  longitudeUser:{
    type: String,
  },
  latitudeUser:{
    type: String,
  }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);