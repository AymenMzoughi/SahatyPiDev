const express = require('express');
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
      
    } = require('../controllers/user-controller');


 
const router = express.Router();
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
// Verify token 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));



module.exports = router;