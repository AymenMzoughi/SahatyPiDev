const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("./Service")
const app = express();
router.get('/track', service.track);
router.get('/', service.getAmbulances);
router.get('/reserved/:clientId', service.getAmbulancesReserved);
router.post('/add', service.addAmbulance);
router.post('/reserve/:clientId/:ambulanceId', service.reserveAmbulance)
router.post('/unreserve/:clientId/:ambulanceId', service.unreserveAmbulance)
router.put('/assignToHospital/:hospitalId/:ambulanceId', service.assignAmbulanceToHospital)
module.exports = router;