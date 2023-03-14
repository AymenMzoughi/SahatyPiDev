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

const signup = async (req, res, next) => {
    const {firstname,lastname,Number,pdp,email,role,password} = req.body;
    let existingUser;
try{
    existingUser = await User.findOne({ email: email});
} catch (err) {
    console.log(err);
}
if (existingUser) {
    return res
    .status(400)
    .json({message: "User already exists! Login Instead" });
}
const hashedPassword = bcrypt.hashSync (password);
const user = new User ({
        firstname,
        lastname,
        Number,
        pdp,
        email,
        password: hashedPassword,
        role,
    });


    try {
        await user.save();
     }  catch (err) {
        console.log(err);
    }

    return res.status(201).json({ message:user });
};








exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
