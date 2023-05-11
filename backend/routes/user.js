const router = require("express").Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.static('uploads'));


const path = require("path");
router.get("/notification/:idUser", userController.notificationsAsSeen)
router.post("/register", userController.signUpUser);
router.post("/login", userController.loginUser);
router.post("/forgetpassword", userController.forget);
router.post("/resetpassword", userController.reset);
router.get("/getAllDoctors/:role", userController.getAllDoctors);
// Protected route
// router.use(requireAuth);
router.get("/profile/:idUser", userController.getUser);
router.put("/edit/:idUser", userController.editUser);

module.exports = router;
