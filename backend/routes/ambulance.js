const router = require("express").Router();
const service = require("../controllers/ambulanceController");

router.get("/", service.getAmbulances);
router.post("/add", service.addAmbulance);
router.post("/reserve/:clientId/:ambulanceId", service.reserveAmbulance);
router.post("/unreserve/:ambulanceId", service.unreserveAmbulance);
router.delete("/deleteAmb/:id", service.deleteAmbulance);

module.exports = router;
