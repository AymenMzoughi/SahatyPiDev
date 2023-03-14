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



const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
  
//    const headers = req.headers [`authorization`] ;
    const token = cookies.split("= ")[1];
    console.log(token);
 if (!token) {
    
    res.status(404).json({message:"No token found"})
   }
         jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
             return res.status(400).json({message:"Invalid Token"})
          }
           console.log(user.id);
             req.id = user.id;
        });
       next();
    } ;






exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
