const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const doctorController = require("../controllers/doctorController");

router.use(requireAuth);
router.post("/updateDoctorProfile", doctorController.updateDoctorProfile);
router.get("getAppointmentsId", doctorController.getAppointmentsId);
router.post(
  "/changeAppointmentStatus",
  doctorController.changeAppointmentStatus
);

module.exports = router;
