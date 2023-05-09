const express = require('express');
const router = express.Router();
const Ambulance = require('../models/ambulance')
const axios = require('axios');
 const Hospital = require('../models/hopital')
 const winstonMongoDB = require('winston-mongodb');

const winston = require('winston');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const bcrypt = require('bcrypt');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format((info, { req }) => {
      const { name, available, reservedBy, hospital, createdAt, latitude, longitude, longitudeUser, latitudeUser } = req?.body || {};
      info.meta = {
        name,
        available,
        reservedBy,
        hospital,
        createdAt,
        location: {
          latitude,
          longitude,
          longitudeUser,
          latitudeUser
        },
      };
      return info;
    })({ req: null }),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/Ambulance/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/Ambulance/combined.log', level: 'info', levelOnly: true }),
    new winston.transports.MongoDB({
      level: 'info',
      db: mongoose.connection,
      options: { useUnifiedTopology: true },
      collection: 'ambulance_logs',
      metaKey: 'meta',
      transformer: (log) => {
        const { name, available, reservedBy, hospital, createdAt, location } = log.meta || {};
        return {
          ...log,
          name,
          available,
          reservedBy,
          hospital,
          createdAt,
          latitude: latitude,
          longitude: longitude,
          longitudeUser: longitudeUser,
          latitudeUser: latitudeUser,
        };
      },
    }),
  ],
});


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

const getAmbulancesReserved = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    // Convert clientId to ObjectId instance
    const clientIdObjId = new mongoose.Types.ObjectId(clientId);

    const ambulances = await Ambulance.find({ reservedBy: clientIdObjId });

    res.status(200).json({ ambulances });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




// Add an ambulance
const addAmbulance = async (req, res, next) => {
  try {
    const { name } = req.body;
    const ambulance = new Ambulance({ name });
    await ambulance.save();
    logger.info('Ambulance adedd successfully', {
      req,
      timestamp: new Date().toISOString(),
    });
    res.status(201).json({ ambulance });
  } catch (err) {
    console.error(err);
    logger.error('Failed to add ambulance', {
      error: err.message, req,
      timestamp: new Date().toISOString(),
    });
    res.status(500).json({ message: 'Server error' });
  }
};


// Reserve a specific ambulance for a given client ID
const reserveAmbulance = async (req, res, next) => {
  try {
      const { clientId, ambulanceId } = req.params;
      const { longitude, latitude } = req.body;


      const ambulance = await Ambulance.findOneAndUpdate(
          { _id: ambulanceId, available: true },
          { $set: { available: false, reservedBy: clientId, createdAt: new Date(), longitudeUser: req.body.longitude, latitudeUser: req.body.latitude } },
          { new: true }
      );
      if (!ambulance) {
          return res.status(404).json({ message: 'Ambulance not available' });
      }
      logger.info(`Patient ${clientId} reserved ambulance ${ambulanceId}`, {
          timestamp: new Date().toISOString(),
      });
      res.status(200).json({ ambulance });
  } catch (err) {
      logger.error("Patient failed to reserve ambulance", { error: err.message, req, timestamp: new Date().toISOString() });
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
};


const unreserveAmbulance = async (req, res, next) => {
  try {
    const { ambulanceId, clientId } = req.params;
    const ambulance = await Ambulance.findById(ambulanceId);
    if (!ambulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }

    const reservedBy = ambulance.reservedBy._id.toJSON();
    const createdAt = ambulance.createdAt;

    // Check if clientId matches reservedBy
    if (clientId !== reservedBy) {
      return res.status(400).json({ message: "You can't unreserve this ambulance since you didn't reserve it" });
    }

    // Check if reservation was made more than 10 seconds ago
    const now = new Date();
    const elapsed = now.getTime() - createdAt.getTime();
    if (elapsed > 1000000000) {
      logger.error("Patient tried to unreserve ambulance, 10 seconds passed", {
        timestamp: new Date().toISOString(),
      });
      return res.status(400).json({ message: 'Annulation impossible, 10 seconds have already passed.' });
    }

    // Reset ambulance fields
    ambulance.reservedBy = null;
    ambulance.createdAt = null;
    ambulance.available = true;
    ambulance.latitudeUser = null;
    ambulance.longitudeUser = null;

    await ambulance.save();
    logger.info(`Patient ${clientId} unreserved ambulance ${ambulanceId}`, {
      timestamp: new Date().toISOString(),
    });
    return res.status(200).json({ ambulance });
  } catch (err) {
    logger.error("Patient failed to unreserve ambulance", { error: err.message, req, timestamp: new Date().toISOString() });
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getuserpos = async(req,res) => {
  try {
    const {ambulanceId} = req.params;
    const position = await Ambulance.findById(ambulanceId);
    res.status(200).json({ position });
  }
  catch
  {
res.error(400).json("Position not found")
  }
}

const verifyPassword = async(req, res) => {
  try {
    const { password, adminId } = req.body;
    const user = await User.findById(adminId);

    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isPasswordCorrect = bcrypt.compareSync(password,user.password);
    console.log('Compare: ',isPasswordCorrect)
    console.log('Pass: ', user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ message: "Password verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const assignAmbulanceToHospital = async (req, res) => {
  try {
    const { hospitalId, ambulanceId } = req.params;

    // Find hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // Find ambulance by ID
    const ambulance = await Ambulance.findById(ambulanceId);

    if (!ambulance) {
      return res.status(404).json({ success: false, message: 'Ambulance not found' });
    }

    // Remove ambulance ID from its old hospital if it exists
    if (ambulance.hospital) {
      const oldHospital = await Hospital.findById(ambulance.hospital);
      if (oldHospital) {
        oldHospital.ambulances = oldHospital.ambulances.filter(id => id.toString() !== ambulanceId.toString());
        await oldHospital.save();
      }
    }

    // Update ambulance coordinates with hospital coordinates
    ambulance.latitude = hospital.location.latitude;
    ambulance.longitude = hospital.location.longitude;
    ambulance.hospital = hospitalId; // Set hospital ID in ambulance

    // Update hospital's ambulances array with assigned ambulance
    hospital.ambulances.push(ambulanceId);

    // Save updated hospital and ambulance
    await hospital.save();
    await ambulance.save();

    res.status(200).json({ success: true, message: 'Ambulance assigned to hospital successfully' });
    logger.info(`Ambulance ${ambulanceId} affected to Hospital ${hospitalId}`, {
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logger.error("Failed to affect ambulance to hospital", {
      error: err.message, req,
      timestamp: new Date().toISOString(),
    });
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  getAmbulances,
  getAmbulancesReserved,
  addAmbulance,
  unreserveAmbulance,
  reserveAmbulance,
  assignAmbulanceToHospital,
  getuserpos,
  verifyPassword,
};