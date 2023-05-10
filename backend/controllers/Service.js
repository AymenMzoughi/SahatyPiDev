const express = require('express');
const router = express.Router();
const Hospital = require('../models/Models')
const winston = require('winston');
const mongoose = require('mongoose');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format((info, { req }) => {
        const { name, latitude, longitude, ambulances } = req?.body || {}; 
        info.meta = {
          name,
          location: { latitude, longitude },
          ambulances, 
        };
        return info;
      })({ req: null }),
    ),
    transports: [
      new winston.transports.File({ filename: 'logs/Hospital/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/Hospital/combined.log', level: 'info', levelOnly: true }),
      new winston.transports.MongoDB({
        level: 'info',
        db: mongoose.connection,
        options: { useUnifiedTopology: true },
        collection: 'hospital_logs',
        metaKey: 'meta',
        transformer: (log) => {
          const { name, location, ambulances,sysdate } = log.meta || {}; 
          return {
            ...log,
            name,
            latitude: location?.latitude,
            longitude: location?.longitude,
            ambulances,
            sysdate,
          };
        },
      }),
    ],
  });
  

  
// Create a new hospital
const createHospital = (req, res) => {
    const { name, latitude, longitude } = req.body;
  
    // Create a new hospital object
    const newHospital = new Hospital({ name, location: { latitude, longitude } });
  
    // Save the hospital object to the database
    newHospital.save()
      .then(hospital => {
        logger.info('Hospital created successfully', { req,
            timestamp: new Date().toISOString(),});
        res.status(201).json(hospital);
      })
      .catch(err => {
        logger.error('Failed to create hospital', { error: err.message, req,  timestamp: new Date().toISOString(),});
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
          logger.info(`Hospital updated successfully with ID: ${id}`, { req, timestamp: new Date().toISOString(), });
          res.status(200).json(hospital);
        } else {
          logger.error(`Hospital not found with ID: ${id}`, { req, timestamp: new Date().toISOString(),});
          res.status(404).json({ message: 'Hospital not found' });
        }
      })
      .catch(err => {
        logger.error(`Failed to update hospital with ID: ${id}`, { error: err.message, req });
        res.status(500).json({ error: err.message });
      });
  };

// Delete a hospital by ID
const deleteHospitalById = (req, res) => {
    const { id } = req.params;
  
    Hospital.findByIdAndDelete(id)
      .then(hospital => {
        if (hospital) {
          logger.info(`Hospital deleted successfully with ID: ${id}`, { req, timestamp: new Date().toISOString(), });
          res.status(200).json({ message: 'Hospital deleted successfully' });
        } else {
          logger.error(`Hospital not found with ID: ${id}`, { req });
          res.status(404).json({ message: 'Hospital not found' });
        }
      })
      .catch(err => {
        logger.error(`Failed to delete hospital with ID: ${id}`, { error: err.message, req , timestamp: new Date().toISOString(),});
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