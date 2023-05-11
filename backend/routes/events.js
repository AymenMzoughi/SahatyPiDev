const router = require("express").Router();
const eventController = require("../controllers/eventController");

router.post("/addEvent", eventController.addEvent);
router.put("/updateEvent/:id", eventController.updateEvent);
router.delete("/deleteEvent/:id", eventController.deleteEvent);
router.get("/getEvent/:id", eventController.getEvent);
router.get("/getAllEvents", eventController.getAllEvents);
router.post("/participate/:id/:userId", eventController.participate);
module.exports = router;
