const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("./Service")
const app = express();
// app.use(express.static('uploads'));
const multer = require('multer');
const path = require('path');

const imagePath = path.join(__dirname, 'uploads', 'image.jpg');
console.log(imagePath);

    // Storage configuration
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // specify the destination folder for uploaded files
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        // specify the file name for uploaded files
        cb(null, file.originalname)
      }
    })

    // Create multer instance with storage configuration
    const upload = multer({ storage: storage })

router.post("/addMedRec",upload.array('images'), service.addMedicalRecord)
router.post("/deleteMedRec/:id", service.deleteMedicalRecord)
router.delete("/deleteImgRec/:medicalImageId/:doctorId", service.deleteImageFromMedicalRecord)
router.get("/showMedRec", service.getAllMedicalRecords)
module.exports = router;