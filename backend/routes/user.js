const router = require("express").Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.static('uploads'));
app.use(cors({ credentials: true, origin: "http://localhost:4000" }));
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const filename =
      file.fieldname + "-" + Date.now() + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/register",upload.single('pdp'), userController.signUpUser);
router.post("/login", userController.loginUser);
router.post("/forgetpassword", userController.forget);
router.post("/resetpassword", userController.reset);
router.get("/getAllDoctors/:role", userController.getAllDoctors);
// Protected route
router.use(requireAuth);
router.get("/login", userController.getUser);
router.put("/login", userController.editUser);
router.post("/addClaim", userController.addClaim);
router.post("/updateClaim/:claimId", userController.updateClaim);
router.delete("/deleteClaim/:claimId", userController.deleteClaim);

module.exports = router;
