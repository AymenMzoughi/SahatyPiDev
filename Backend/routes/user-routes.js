const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");

const passport = require('passport');
const {
     signup,
      login, 
      verifyToken, 
      getUser, 
      refreshToken,
      logout,
      forget,
      reset,
      applyDoctor,
      markNotificationAsSeen,
      deleteAllNotification,
      getAllApprovadDoctors,
      bookAppointment,
      checkBookAppointment,
      checkBookAvailability,
      addClaim,
      deleteClaim,
      updateClaim,
      
    } = require('../controllers/user-controller');


 
const router = express.Router();
router.post ("/addClaim", addClaim);
router.post("/updateClaim/:claimId", updateClaim)
router.delete("/deleteClaim/:claimId", deleteClaim)
 router.post("/signup", signup);
 router.post("/login", login);
 router.get("/user", verifyToken, getUser);
 router.get("/refresh",refreshToken, verifyToken, getUser );
 router.post("/logout", verifyToken, logout);
 router.post('/forgot-password', forget);
 router.post('/reset-password', reset);
 router.post("/get-info-id", authMiddleware,getinfouserByid);
 router.post("/apply-doctor-account", authMiddleware,applyDoctor);
 router.post("/notifications-as-seen",authMiddleware,markNotificationAsSeen);
 router.get("/get-all-approved-doctors", authMiddleware,deleteAllNotification);
 router.get("/get-all-approved-doctors", authMiddleware,getAllApprovadDoctors);
 router.post("/book-appointment", authMiddleware, bookAppointment);
 router.post("/check-booking-avilability", authMiddleware,checkBookAvailability);
 router.get("/get-appointment-id", authMiddleware,getAppointmentById);
// Verify token 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));



module.exports = router;