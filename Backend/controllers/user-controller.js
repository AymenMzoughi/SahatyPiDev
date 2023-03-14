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






  const reset = async (req, res, next) => {
    const { resetToken, password } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'getawayvoy.services@gmail.com',
          pass: 'byoxgpbbfanfopju',
        },
      });
  
    try {
      const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);
  
      const user = await User.findOne({ _id: decodedToken.id, resetToken });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Update the user's password and remove the reset token
      user.password = bcrypt.hashSync(password);
      user.resetToken = null;
      await user.save();
  
      const mailOptions = {
        to: user.email,
        from: 'getawayvoy.services@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed. Ahawa '+password+'\n'
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
      });
  
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
// const forget = async (req, res, next) => {
//     const { email } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Generate a password reset token and store it in the user object
//       const resetToken = jwt.sign(
//         { id: user._id },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: '15m' }
//       );
//       user.resetToken = resetToken;
//       await user.save();
  
//       // Construct a password reset URL with the token
//       const resetUrl =`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
//       // Return the password reset URL to the user
//       return res.status(200).json({ message: 'Password reset URL generated', resetUrl });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
//   const reset = async (req, res, next) => {
//     const { resetToken, password } = req.body;
  
//     try {
//       const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);
  
//       const user = await User.findById(decodedToken.id);
  
//       if (!user || user.resetToken !== resetToken) {
//         console.log(user.resetToken);
//         console.log(resetToken);
//                 return res.status(400).json({ message: 'Invalid or expired token' });
//       }
  
//       // Update the user's password and remove the reset token
//       user.password = bcrypt.hashSync(password);
//       user.resetToken = null;
//       await user.save();
  
//       return res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  
// const google = async (req, res) => {
//   const {token} = req.body;
//   const user = await verify(token);
//   res.send(user);
// }

// async function verify(token) {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,  // Replace with your client ID
//   });
//   const payload = ticket.getPayload();
//   return payload;
// }






// Set up the Google strategy with Passport.js





exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
