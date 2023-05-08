const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("../controllers/medicalRecordController")
const app = express();
app.use(cors({credentials: true, origin: "http://localhost:4000" }));
const multer = require('multer');

    // Storage configuration
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // Specify the filename for uploaded files
      }
    });
    


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
router.delete("/deletePrescriptionRec/:prescriptionId/:doctorId", service.deletePrescriptionFromMedicalRecord)
router.get("/showMedRec", service.getAllMedicalRecords)
router.get("/patientList/:doctorId",service.getPatientsForDoctor)
router.get("/myMedicalRec/:patientId",service.getMedicalRecordByPatientId)
module.exports = router;