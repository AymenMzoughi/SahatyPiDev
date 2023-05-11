const router = require("express").Router();
 const requireAuth = require("../middleware/requireAuth");

 const appointmentController = require("../controllers/AppointmentController");
//  const { route } = require("./notification");



router.post( "/checkBookingAvilability", appointmentController.checkBookingAvilability);
router.put("/approve/:idUser", appointmentController.changeAppointmentStatus)
 router.post( "/bookAppointment",  appointmentController.bookAppointment);
router.put("/cancel", appointmentController.cancelAppointment)
 router.get("/getAppointments/:idUser",  appointmentController.getAppointments);
 router.get("/getAppointmentsForPatient/:idUser",appointmentController.getAppointmentsForPatient)
 router.post("/notificationsAsSeen" ,appointmentController.notificationsAsSeen);
 router.post("/deleteAllNotifications", appointmentController.deleteAllNotifications);

module.exports = router;