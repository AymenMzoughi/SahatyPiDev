
const express = require('express');
const cors = require('cors');
var router=express.Router()
const service = require("../controllers/ambulanceController");

const app = express();
router.get('/', service.getAmbulances);
router.get('/reserved/:clientId', service.getAmbulancesReserved);
router.post('/add', service.addAmbulance);
router.post('/reserve/:clientId/:ambulanceId', service.reserveAmbulance)
router.post('/unreserve/:clientId/:ambulanceId', service.unreserveAmbulance)
router.put('/assignToHospital/:hospitalId/:ambulanceId', service.assignAmbulanceToHospital)
router.get('/userpos/:ambulanceId', service.getuserpos)
router.post('/verifyPassword', service.verifyPassword)


module.exports = router;