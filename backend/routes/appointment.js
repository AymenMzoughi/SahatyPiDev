const router = require("express").Router();
 const requireAuth = require("../middleware/requireAuth");

 const appointmentController = require("../controllers/AppointmentController");
//  const { route } = require("./notification");



router.post( "/checkBookingAvilability", appointmentController.checkBookingAvilability);

 router.post( "/bookAppointment",  appointmentController.bookAppointment);
router.delete("/cancelAppointment", appointmentController.cancelAppointment)
 router.get("/getAppointmentId",  appointmentController.getAppointmentId);
 router.post("/notificationsAsSeen" ,appointmentController.notificationsAsSeen);
 router.post("/deleteAllNotifications", appointmentController.deleteAllNotifications);

module.exports = router;