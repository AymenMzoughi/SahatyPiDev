const express = require('express');
const router = express.Router();
const Ambulance = require('./Models')
const axios = require('axios');

  // Get all ambulances
const getAmbulances = async (req, res, next) => {
    try {
      const ambulances = await Ambulance.find();
      res.status(200).json({ ambulances });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Add an ambulance
const addAmbulance = async (req, res, next) => {
    try {
      const { name, latitude, longitude } = req.body;
      const ambulance = new Ambulance({ name, latitude, longitude });
      await ambulance.save();
      res.status(201).json({ ambulance });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


  
  module.exports = {
    getAmbulances,
    addAmbulance,

  };
  