const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const {

getAppointmentsId,
changeAppointmentStatus,
updateDoctorProfile,

}=require('../controllers/doctor-controller');

const router = express.Router();

router.post("/updateDoctorProfile",authMiddleware,updateDoctorProfile);
router.get("getAppointmentsId", authMiddleware,getAppointmentsId)
router.post("/changeAppointmentStatus", authMiddleware,changeAppointmentStatus)


module.exports = router;