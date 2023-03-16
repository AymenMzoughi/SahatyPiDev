const faceapi = require('face-api.js');
const FaceModel = require('./faceModels');
const fs = require('fs');
const path = require('path');
const User = require('./userModel');
const models = require('../models/ssd_mobilenetv1_model-weights_manifest.json');
const { Image } = require('image-js');
const multer = require('multer');

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNABLE_TO_ADD: 'Unable to add',
  USER_NOT_FOUND: 'face not found',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage }).single('faceData');

async function extractFaceDescriptor(faceImg) {
  const tensor = faceapi.tf.tensor(faceImg);
  const detections = await faceapi.detectAllFaces(tensor).withFaceLandmarks().withFaceDescriptors();

  // Check if only one face is detected
  if (detections.length !== 1) {
    throw new Error('Invalid image: must contain exactly one face');
  }

  return detections[0].descriptor;
}

const addFace = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }

    const faceFilePath = req.file.path;

    // Chargement des modèles
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, '../models'), models),
      faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '../models'), models),
      faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '../models'), models),
      faceapi.nets.tinyFaceDetector.loadFromDisk(path.join(__dirname, '../models'), models),
    ]);

    // Extract face descriptor from the uploaded image
    const faceImg = await Image.load(faceFilePath);
    const faceDescriptor = await extractFaceDescriptor(faceImg);

    // Find the matching user
    const users = await User.find();
    for (const user of users) {
      const userFilePath = `public/${user.pdp.filename}`;
      const userImg = await Image.load(userFilePath);
      const userDescriptor = await extractFaceDescriptor(userImg);

      const distance = faceapi.euclideanDistance(faceDescriptor, userDescriptor);
      if (distance < 0.6) {
        // User found, return the user data
        console.log(user);
        if (!req.headers['transfer-encoding']) {
          req.headers['transfer-encoding'] = 'chunked';
        }
        return res.status(200).json(user);
      }
    }

    // User not found
    console.log('User not found');
    if (!req.headers['transfer-encoding']) {
      req.headers['transfer-encoding'] = 'chunked';
    }
    return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
  });
};




module.exports = { addFace };
