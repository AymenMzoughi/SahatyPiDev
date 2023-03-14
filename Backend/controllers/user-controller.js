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


 const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if(!prevToken) {
        return res.status(400).json({message: "Couldn't find token"});
    }
    jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY, (err,user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentification failed "});
        }
        res.clearCookie(`${user.id }`);
        req.cookies[`${user.id}`] = "";

     return res.status(200).json({ message: "successfully Logged Out"})
// if(req.cookies[`${existingUser._id}`]) {
//     req.cookies[`${existingUser._id}`] = ""
// }




    });

 }


 



exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
