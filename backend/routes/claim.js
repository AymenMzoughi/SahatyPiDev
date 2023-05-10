const express = require('express');
const cors = require('cors');

var service=require("../controllers/claimController")
const router = express.Router();

router.post("/addClaim", service.addClaim);
router.put("/updateClaim/:claimId", service.updateClaim);
router.delete("/deleteClaim/:claimId", service.deleteClaim);

module.exports = router;