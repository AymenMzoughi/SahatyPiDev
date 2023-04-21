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
const register= async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
};


    const addClaim=async(req,res)=>{
      try {
        const userId = req.body.userId;
        const { doctorName, description } = req.body;
        const claim = new Claim({
          userId,
          doctorName,
          description,
          status: 'pending',
         
        });
        const result = await claim.save();
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
      }
    };

//update claim

   const updateClaim= async (req, res) => {
      try {
        const claimId = req.params.claimId;
        const { doctorName, description, date } = req.body;
        const updatedClaim = await Claim.findByIdAndUpdate(
          claimId,
          { doctorName, description, date },
          { new: true }
        );
        res.json(updatedClaim);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
      }
    };
    const deleteClaim= async (req, res) => {
      try {
        const claimId = req.params.claimId;
        await Claim.findByIdAndDelete(claimId);
        res.json({ message: 'Claim deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
      }
    };


// exports.getinfouserByid=getAppointmentById
// exports.checkBookAvailability=checkBookAvailability
// exports.bookAppointment=bookAppointment
// exports.getAllApprovadDoctors=getAllApprovadDoctors
// exports.deleteAllNotification=deleteAllNotification
// exports.markNotificationAsSeen=markNotificationAsSeen
// exports.applyDoctor=applyDoctor
// exports.getinfouserByid=getuserinfobyid
// exports.logout = logout;
// exports.signup = signup;
// exports.login = login;
// exports.verifyToken = verifyToken;
// exports.getUser = getUser;
// exports.refreshToken = refreshToken;
// exports.forget = forget;
// exports.reset = reset;
exports.updateClaim=updateClaim
exports.addClaim=addClaim
exports.deleteClaim=deleteClaim
exports.register=register
