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




 const forget = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a password reset token and store it in the user object
      const resetToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' }
      );
      user.resetToken = resetToken;
      await user.save();
  
      // Send an email to the user with a link to reset password
      // You can use a nodemailer or any other email library to send emails
      // Here is an example using nodemailer:
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "getawayvoy.services@gmail.com",
          pass: "byoxgpbbfanfopju",
        },
      });
  
      const mailOptions = {
        from: "getawayvoy.services@gmail.com",
        to: email,
        subject: 'Password reset request',
        html: `
        <p>You have requested to reset your password. Click the link below to reset it:</p>
        <a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>
      `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Failed to send email' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'Email sent' });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


 




exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
