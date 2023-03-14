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
passport.use(new GoogleStrategy({
  clientID: '195893953884-gqquss79jovigo2kt48qnc8k0d78a58t.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/auth/google/callback'
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Check if the user is already registered in the database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // If the user is not registered, create a new account
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatarUrl: profile.photos[0].value
      });
    }
    // If the user is registered, return the user object
    const response = {
      user,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5000',
      },
    };
    done(null, response);
  } catch (err) {
    done(err);
  }
}
));






exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forget = forget;
exports.reset = reset;
