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
  

// Reserve a specific ambulance for a given client ID
const reserveAmbulance = async (req, res, next) => {
    try {
      const { clientId, ambulanceId} = req.params;
      const ambulance = await Ambulance.findOneAndUpdate(
        { _id: ambulanceId, available: true },
        { $set: { available: false, reservedBy: clientId, createdAt: new Date() }},
        { new: true }
      );
      if (!ambulance) {
        return res.status(404).json({ message: 'Ambulance not available' });
      }
      res.status(200).json({ ambulance });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const unreserveAmbulance = async (req, res, next) => {
    try {
      const { ambulanceId } = req.params;
      const ambulance = await Ambulance.findById(ambulanceId);
      if (!ambulance) {
        return res.status(404).json({ message: 'Ambulance not found' });
      }
  
      const reservedBy = ambulance.reservedBy;
      const createdAt = ambulance.createdAt;
  
      // Vérifier si la réservation a été faite depuis plus de 10 secondes
      const now = new Date();
      const elapsed = now.getTime() - createdAt.getTime();
      if (elapsed > 10000) {
        return res.status(400).json({ message: 'Annulation impossible, 10 seconde sont déjà passé.' });
      }
  
      // Réinitialiser les champs
      ambulance.reservedBy = null;
      ambulance.createdAt = null;
      ambulance.available = true;
      ambulance.latitudeUser = null;
      ambulance.longitudeUser = null;
  
      await ambulance.save();
      res.status(200).json({ ambulance });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    getAmbulances,
    addAmbulance,
    reserveAmbulance,
    unreserveAmbulance
  };
  