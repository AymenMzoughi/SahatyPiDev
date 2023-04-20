const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("./Service")
const app = express();
// app.use(express.static('uploads'));
const multer = require('multer');

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

// Filter for accepted file types
const fileFilter = (req, file, cb) => {
  // Accept PDF and image file types
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
}

// Create multer instance with storage configuration and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
})

router.post("/addMedRec",upload.array('images'), service.addMedicalRecord)
router.post("/deleteMedRec/:id", service.deleteMedicalRecord)
router.delete("/deleteImgRec/:medicalImageId/:doctorId", service.deleteImageFromMedicalRecord)
router.delete("/deleteAlergyRec/:allergyId/:doctorId", service.deleteAllergyFromMedicalRecord)
router.delete("/deleteMedicationRec/:medicationId/:doctorId", service.deleteMedicationFromMedicalRecord)
router.delete("/deleteTreatmentRec/:treatmentId/:doctorId", service.deleteTreatmentFromMedicalRecord)
router.get("/showMedRec", service.getAllMedicalRecords)
router.get("/download/:filePath(*)", service.downloadFile)
router.get("/myMedicalRec/:patientId",service.getMedicalRecordByPatientId)
module.exports = router;