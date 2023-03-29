var express= require("express")
var router=express.Router()
var service=require("./Service")

router.post("/addMedRec", service.addMedicalRecord)
router.post("/deleteMedRec/:id", service.deleteMedicalRecord)
router.delete("/deleteImgRec/:medicalImageId/:doctorId", service.deleteImageFromMedicalRecord)
module.exports = router;