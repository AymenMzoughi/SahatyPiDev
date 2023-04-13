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

const  bookAppointment=async(req,res)=>{
    try {
        req.body.status = "pending";
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        const user = await User.findOne({ _id: req.body.doctorInfo.userId });
        user.unseenNotifications.push({
          type: "new-appointment-request",
          message: `A new appointment request has been made by ${req.body.userInfo.name}`,
          onClickPath: "/doctor/appointments",
        });
        await user.save();
        res.status(200).send({
          message: "Appointment booked successfully",
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error booking appointment",
          success: false,
          error,
        });
      }
    };




exports.bookAppointment=bookAppointment
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
