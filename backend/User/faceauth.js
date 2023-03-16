const express = require("express");
const router = express.Router();
const request = require('request');
const fs = require('fs');

// Define your Luxand Cloud API token
const TOKEN = '8c5059567c9d4aad9a046f60e2358e4b';

// Define the path to the folder where user images are stored
const USERS_FOLDER_PATH = 'public';

// Define a function to perform face recognition using the Luxand Cloud API
function verifyUserInImage(imageUrl) {
  return new Promise((resolve, reject) => {
    // Read the list of user images from the USERS_FOLDER_PATH directory
    fs.readdir(USERS_FOLDER_PATH, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      // Loop through each user image file
      for (const file of files) {
        const filePath = `${USERS_FOLDER_PATH}/${file}`;

        // Send a verification request to the Luxand Cloud API
        make_request('POST', 'https://api.luxand.cloud/photo/verify', { photo: imageUrl, subject_id: file }, {}, (response) => {
          // Check if the API response indicates a match was found
          if (response.status === 'success' && response.confidence > 0.5) {
            // Return the name of the matching user
            resolve(file.replace('.jpg', ''));
            return;
          }
        });
      }

      // If no match was found, reject the promise
      reject(new Error('User not found in image'));
    });
  });
}

// Define a function to send requests to the Luxand Cloud API
function make_request(method, url, data, files = {}, callback) {
  const requestData = JSON.parse(JSON.stringify(data));
  for (const i of Object.keys(files)) {
    requestData[i] = fs.createReadStream(files[i]);
  }

  request({
    method: method,
    url: url,
    headers: {
      'token': TOKEN
    },
    formData: requestData
  }, function (error, response, body) {
    if (error) throw new Error(error);

    if (callback != undefined)
      callback(JSON.parse(body))
  });
}

// Call the verifyUserInImage function with the URL of the webcam image
verifyUserInImage('http://localhost:3001/')
  .then((username) => {
    // If the user is found, do something with their username
    console.log(`User ${username} found in image!`);
  })
  .catch((error) => {
    // If the user is not found, handle the error
    console.error(error);
  });

  router.post("/verify-face", (req, res) => {
    const imagePath = req.body.imagePath; // récupérer le chemin d'accès à l'image à vérifier
  
    // appeler la fonction verifyFace de faceService pour vérifier si l'image contient un visage similaire à celui d'un utilisateur existant
    const user = faceService.verifyFace(imagePath);
  
    if (user) {
      // si un utilisateur a été trouvé, retourner ses informations
      res.status(200).json(user);
    } else {
      // si aucun utilisateur n'a été trouvé, retourner une réponse avec un code d'erreur
      res.status(404).json({ message: "Aucun utilisateur trouvé pour cette image" });
    }
  });
