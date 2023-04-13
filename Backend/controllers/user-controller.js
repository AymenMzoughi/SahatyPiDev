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

const  applyDoctor=async(req,res)=>{

    try {
        const newdoctor = new Doctor({ ...req.body, status: "pending" });
        await newdoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });
        if (!adminUser) {
          return res.status(500).send({
            message: "Error applying doctor account: no admin user found",
            success: false,
          });
        }
       const unseenNotifications = adminUser.unseenNotifications;
    
        unseenNotifications.push({
          type: "new-doctor-request",
          message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
          data: {
            doctorId: newdoctor._id,
            name: newdoctor.firstName + " " + newdoctor.lastName,
          },
          onClickPath: "/admin/doctorslist",
        });
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(200).send({
          success: true,
          message: "Doctor account applied successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error applying doctor account",
          success: false,
          error,
        });
      }
    };
    

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
