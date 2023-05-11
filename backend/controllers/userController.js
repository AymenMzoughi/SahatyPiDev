const Appointment = require("../models/appointment");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const multer = require('multer');

const getAllDoctors = async (req, res) => {
  try {
    const {role}=req.params
    const doctors = await UserModel.find({role});
  
     
      res.json(doctors)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

//Login
const loginUser = async (req, res, next) => {
  const { mail, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ mail: mail });

  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(401).json({ message: "User not found. Signup Please" })
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid Password' })
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",

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
    .json({ message: 'Successfully Logged In', user: existingUser });
};
//Sign up
const signUpUser = async (req, res) => {
  const reqBody = req.body;
  try {
    const user = await UserModel.signUp(reqBody);
    // Generate a JWT token
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ mail: reqBody.mail, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};


//Edit
const editUser = async (req, res) => {
  const userId  = req.params.idUser;
  const { twitter, instagram, facebook, website, numero, feePerCunsultation,experience,address,mail,specialization } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: {
          mail: mail,
          twitter: twitter,
          instagram: instagram,
          facebook: facebook,
          website: website,
          numero: numero,
          feePerCunsultation: feePerCunsultation,
          experience: experience,
          address: address,
          specialization,
      }},
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Get
// const getUser = async (req, res) => {
//   try {
//     const {userId}=req.params.idUser
//     const profile = await UserModel.findOne({userId});
  
     
//       res.json(profile)
   
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error applying doctor account",
//       success: false,
//       error,
//     });
//   }
// };

const getUser = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    const user = await UserModel.findById(idUser);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//ADD
const addUser = (req, res) => {
  const newUser = new UserModel(req.body);
  newUser
    .save()
    .then(() => res.json("User added successfully !"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const forget = async (req, res, next) => {
  const { mail } = req.body;

  try {
    const user = await UserModel.findOne({ mail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("hnai")
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
      to: mail,
      subject: 'Password reset request',
      html: `
      <p>You have requested to reset your password. Click the link below to reset it:</p>
      <a href="http://localhost:3000/resetpassword/${resetToken}">http://localhost:3000/resetpassword/${resetToken}</a>
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
  try {
    const { token, password } = req.body;
    console.log(req.body)
    // Check if resetToken exists and is not empty or null
    if (!token) {
      return res.status(400).json({ message: "Reset token is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "getawayvoy.services@gmail.com",
        pass: "byoxgpbbfanfopju",
      },
    });

    const usertok = await UserModel.findOne({
      resetToken: req.body.token,
    });

    console.log(usertok)

    if (!usertok) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the user's password and remove the reset token
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    usertok.password = hash;
    usertok.resetToken = null;
    await usertok.save();

    const mailOptions = {
      to: usertok.mail,
      from: "getawayvoy.services@gmail.com",
      subject: "Your password has been changed",
      text:
        "Hello,\n\n" +
        "This is a confirmation that the password for your account " +
        usertok.mail +
        " has just been changed. Ahawa " +
        password +
        "\n",
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    console.log("the error is in the catch");
    return res.status(500).json({ message: "Internal server error" });
  }
};

const notificationsAsSeen =async (req, res) => {

  try {
    const userId = req.params.idUser;
    const user = await UserModel.findOne({ userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
}
;

const deleteAllNotifications= async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
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


module.exports = {
  notificationsAsSeen,
  signUpUser,
  addUser,
  loginUser,
  getUser,
  editUser,
  reset,
  forget,
  getAllDoctors,
};
