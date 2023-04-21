const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const{
    getAllDoctors, 
    getAllUsers,
    changeAccountStatus,
    markClaimAsProcessed,
    pendingClaims,
    deleteClaim,

}=require ('../controllers/admin-controller');

const router = express.Router();
router.delete("/deleteClaim/:id",deleteClaim);
router.get("/getAllDoctors",authMiddleware, getAllDoctors)
router.get("/getAllUsers",authMiddleware,getAllUsers)
router.post("/changeAccountStatus",authMiddleware,changeAccountStatus)
router.get("/markClaimAsProcessed/:id",markClaimAsProcessed)
router.get("/pendingClaims",pendingClaims);




module.exports = router;