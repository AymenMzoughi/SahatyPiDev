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

const  getAllApprovadDoctors=async(req,res)=>{
    try {
        const doctors = await Doctor.find({ status: "approved" },"firstName lastName");
        res.status(200).send({
          message: "Approved doctors fetched successfully",
          success: true,
          data: doctors,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error fetching approved doctors",
          success: false,
          error,
        });
      }
    };





exports.getAllApprovadDoctors=getAllApprovadDoctors
exports.deleteAllNotification=deleteAllNotification
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
