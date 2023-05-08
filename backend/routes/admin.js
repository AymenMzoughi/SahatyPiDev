const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");

const adminController = require("../controllers/adminController");

router.get("/getAllDoctors", adminController.getAllDoctors);
//protected routes
router.use(requireAuth);
router.delete("/deleteClaim/:id", adminController.deleteClaim);
router.get("/markClaimAsProcessed/:id", adminController.markClaimAsProcessed);
router.get("/pendingClaims", adminController.pendingClaims);
router.get("/getAllUsers", adminController.getAllUsers);
router.post("/changeAccountStatus", adminController.changeAccountStatus);

module.exports = router;
