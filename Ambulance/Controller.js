const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("./Service")
const app = express();

router.get('/', service.getAmbulances);
router.post('/add', service.addAmbulance);
router.post('/reserve/:clientId/:ambulanceId', service.reserveAmbulance)
router.post('/unreserve/:ambulanceId', service.unreserveAmbulance)
module.exports = router;