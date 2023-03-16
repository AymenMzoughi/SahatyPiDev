const cookieSession = require("cookie-session");

const express = require("express");

const app = express();
const mongoose = require("mongoose");
var userRoutes = require("./User/userController");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const passportSetup = require("./passport");

require('dotenv').config();
app.use(cors({credentials: true, origin: "http://localhost:3002" }));
app.use(cookieParser());
app.use(express.json());
// Database Configuration
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      'mongodb+srv://anwer_mh:AnwerMh@mern.fhs0jjo.mongodb.net/?retryWrites=true&w=majority',
      connectionParams
    );
    console.log("Database connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

database();
///////////////////Cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
/////////////
app.use(
  cookieSession({ name: "session", keys: ["baka"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
///////////////Routes
app.use("/User", userRoutes);
app.listen(3000);




