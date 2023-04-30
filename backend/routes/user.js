const router = require("express").Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
router.post("/register", userController.signUpUser);
router.post("/login", userController.loginUser);
router.post("/forgetpassword", userController.forget);
router.post("/resetpassword", userController.reset);

// Protected route
router.use(requireAuth);
router.get("/login", userController.getUser);
router.put("/login", userController.editUser);
router.post("/addClaim", userController.addClaim);
router.post("/bookAppointment", userController.bookAppointment);
router.post("/updateClaim/:claimId", userController.updateClaim);
router.delete("/deleteClaim/:claimId", userController.deleteClaim);
module.exports = router;
