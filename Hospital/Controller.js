const express = require('express');
const cors = require('cors');
var router=express.Router()
var service=require("./Service")
const app = express();

// Attach the CRUD routes to the router
router.post('/add', service.createHospital);
router.get('/', service.getAllHospitals);
router.get('/getbyid/:id', service.getHospitalById);
router.put('/update/:id', service.updateHospitalById);
router.delete('/delete/:id',service.deleteHospitalById);

module.exports = router;
