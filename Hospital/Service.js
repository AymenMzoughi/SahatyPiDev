const express = require('express');
const router = express.Router();
const Hospital = require('./Models')

// Create a new hospital
const createHospital = (req, res) => {
  const { name, latitude, longitude } = req.body;

  // Create a new hospital object
  const newHospital = new Hospital({ name, location: { latitude, longitude } });

  // Save the hospital object to the database
  newHospital.save()
    .then(hospital => {
      res.status(201).json(hospital);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Get all hospitals
const getAllHospitals = (req, res) => {
  Hospital.find()
    .then(hospitals => {
      res.status(200).json(hospitals);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Get a single hospital by ID
const getHospitalById = (req, res) => {
  const { id } = req.params;

  Hospital.findById(id)
    .then(hospital => {
      if (hospital) {
        res.status(200).json(hospital);
      } else {
        res.status(404).json({ message: 'Hospital not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Update a hospital by ID
const updateHospitalById = (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude } = req.body;

  Hospital.findByIdAndUpdate(id, { name, location: { latitude, longitude } }, { new: true })
    .then(hospital => {
      if (hospital) {
        res.status(200).json(hospital);
      } else {
        res.status(404).json({ message: 'Hospital not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Delete a hospital by ID
const deleteHospitalById = (req, res) => {
  const { id } = req.params;

  Hospital.findByIdAndDelete(id)
    .then(hospital => {
      if (hospital) {
        res.status(200).json({ message: 'Hospital deleted successfully' });
      } else {
        res.status(404).json({ message: 'Hospital not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
    createHospital,
    getAllHospitals,
    getHospitalById,
    deleteHospitalById,
    updateHospitalById
  };