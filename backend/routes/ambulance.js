const router = require("express").Router();
const service = require("../controllers/ambulanceController");

router.get("/", service.getAmbulances);
router.post("/add", service.addAmbulance);
router.post("/reserve/:clientId/:ambulanceId", service.reserveAmbulance);
router.post("/unreserve/:ambulanceId", service.unreserveAmbulance);
module.exports = router;
