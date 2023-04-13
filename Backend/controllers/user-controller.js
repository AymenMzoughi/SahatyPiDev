const User = require ('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const JWT_SECRET_KEY = "MyKey";
// Import necessary libraries and modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// Configure Google strategy
const express = require('express');
const router = express.Router();

const  markNotificationAsSeen=async(req,res)=>{

    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
          success: true,
          message: "All notifications marked as seen",
          data: updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error applying doctor account",
          success: false,
          error,
        });
      }
    }
  ;
  
    
exports.markNotificationAsSeen=markNotificationAsSeen
exports.applyDoctor=applyDoctor
exports.getinfouserByid=getuserinfobyid
exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
