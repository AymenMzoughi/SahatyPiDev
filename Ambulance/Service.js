const express = require('express');
const router = express.Router();
const Ambulance = require('./Models')
const axios = require('axios');
const Hospital = require('../Hospital/Models')
const winston = require('winston');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


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

const track = async()=>{
// Socket.IO logic for ambulance tracking
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Emit ambulance location to the client
  socket.on('getAmbulanceLocation', async (ambulanceId) => {
    try {
      // Find the ambulance by ID
      const ambulance = await Ambulance.findById(ambulanceId);
      if (ambulance) {
        const { name, latitude, longitude } = ambulance;
        // Emit the ambulance location to the client
        io.to(socket.id).emit('ambulanceLocation', { name, latitude, longitude });
      } else {
        // Ambulance not found
        io.to(socket.id).emit('ambulanceNotFound', { message: 'Ambulance not found' });
      }
    } catch (err) {
      // Error occurred while fetching ambulance location
      console.error(err);
      io.to(socket.id).emit('error', { message: 'Error occurred while fetching ambulance location' });
    }
  });

  // Emit ambulance location updates to the client
  socket.on('startAmbulanceTracking', async ({ ambulanceId, latitudeUser, longitudeUser }) => {
    try {
      // Find the ambulance by ID
      const ambulance = await Ambulance.findById(ambulanceId);
      if (ambulance) {
        // Update the ambulance location every 5 seconds and emit to the client
        const updateInterval = setInterval(async () => {
          // Update the ambulance location based on the destination
          // Calculate the distance and direction to the user's destination
          const distance = calculateDistance(ambulance.latitude, ambulance.longitude, latitudeUser, longitudeUser);
          const direction = calculateDirection(ambulance.latitude, ambulance.longitude, latitudeUser, longitudeUser);

          // Update the ambulance's latitude and longitude based on the direction and distance
          const step = 0.001; // Define a step size for movement
          ambulance.latitude += step * Math.cos(direction);
          ambulance.longitude += step * Math.sin(direction);
          await ambulance.save();

          const { name, latitude, longitude } = ambulance;
          // Emit the ambulance location to the client
          io.to(socket.id).emit('ambulanceLocation', { name, latitude, longitude });

          // Check if ambulance has reached the destination within a certain threshold distance
          const thresholdDistance = 0.01; // Define a threshold distance for destination reached
          if (calculateDistance(ambulance.latitude, ambulance.longitude, latitudeUser, longitudeUser) <= thresholdDistance) {
            clearInterval(updateInterval);
            // Emit destination reached event to the client
            io.to(socket.id).emit('destinationReached', { message: 'Destination reached' });
          }
        }, 5000); // Update every 5 seconds

      } else {
        // Ambulance not found
        io.to(socket.id).emit('ambulanceNotFound', { message: 'Ambulance not found' });
      }
    } catch (err) {
      // Error occurred while updating ambulance location
      console.error(err);
      io.to(socket.id).emit('error', { message: 'Error occurred while updating ambulance location' });
    }
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

function calculateDirection(lat1, lon1, lat2, lon2) {
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return Math.atan2(y, x);
}

}
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
      logger.info('Ambulance adedd successfully', { req,
        timestamp: new Date().toISOString(),});
      res.status(201).json({ ambulance });
    } catch (err) {
      console.error(err);
      logger.error('Failed to add ambulance', {  error: err.message, req,
        timestamp: new Date().toISOString(),});
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
      logger.info(`Patient ${clientId} reserved ambulance ${ambulanceId}`, {
        timestamp: new Date().toISOString(),});
      res.status(200).json({ ambulance });
    } catch (err) {
      logger.error(`Patient failed to reserve ambulance`, { error: err.message, req,
        timestamp: new Date().toISOString(),});
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
      if (elapsed > 100000000) {
        logger.error(`Patient tried to unreserve ambulance, 10 seconds passed`, {
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
      logger.error(`Patient failed to unreserve ambulance`, { error: err.message, req, timestamp: new Date().toISOString() });
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
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
        timestamp: new Date().toISOString(),});
    } catch (err) {
      logger.error(`Failed to affect ambulance to hospital`, { error: err.message, req,
        timestamp: new Date().toISOString(),});
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };


  module.exports = {
    track,
    getAmbulances,
    getAmbulancesReserved,
    addAmbulance,
    reserveAmbulance,
    unreserveAmbulance,
    assignAmbulanceToHospital
  };
  