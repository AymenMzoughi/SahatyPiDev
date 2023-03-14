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



const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return new Error(err);
    }
    if (!existingUser) {
        return res.status(401).json({message:"User not found. Signup Please"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({message:'Invalid Password'})
    }
const token = jwt.sign({id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",

});
console.log("Generated Token\n", token);
res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: 'lax',
});
existingUser.token = token;
    return res
    .status(200)
    .json({message:'Successfully Logged In', user: existingUser });
};

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
const getUser = async (req, res, next) => {
const userId = req.id;
let user;
try {
    user = await User.findById(userId, "-password");
} catch (err) {
    return new Error(err)
}
if (!user) {
    return res.status(404).json({message: "User Not Found"})
}
return res.status(200).json({user})
}
const refreshToken = (req,res,next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if(!prevToken) {
        return res.status(400).json({message: "Couldn't find token"});
    }
    jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY,(err,user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({message: "Authentification failed "});
        }
        res.clearCookie(`${user.id }`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn:"35s",
        });

        console.log("Regenerated Token\n", token);

// if(req.cookies[`${existingUser._id}`]) {
//     req.cookies[`${existingUser._id}`] = ""
// }

res.cookie(String(user.id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), //30s
    httpOnly: true,
    sameSite: "lax",
});

req.id = user.id;
next();
    });
};
 





exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
