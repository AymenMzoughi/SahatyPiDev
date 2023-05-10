const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  firstname: {
    type: String,

  },
  lastname: {
    type: String,

  },
  numero: {
    type: Number,

  },
  pdp: {
    type: String,

  },
  mail: {
    type: String,

    
  },
  role: { type: String, required:true,},
  password: {
    type: String,

  },
  website: {
    type: String,

  },
  address: {
    type: String,

  },
  specialization: {
    type: String,

  },
  experience: {
    type: String,

  },
  feePerCunsultation: {
    type: Number,

  },
  timings: {
    type: Array,

  },
  status: {
    type: String,
    default: "pending",
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },


  resetToken: { type: String },

  seenNotifications: {
    type: Array,
    default: [],
  },
  unseenNotifications: {
    type: Array,
    default: [],
  },
},
{
  timestamps: true,
},
  
);

//Sign up static method
userSchema.statics.signUp = async function (reqBody) {
  const mailExists = await this.findOne({ mail: reqBody.mail });
  if (mailExists) throw Error("mail already exists !");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(reqBody.password, salt);
  reqBody.password = hash;
  const user = this.create(reqBody);
  return user;
};

//Login static method
userSchema.statics.login = async function (reqBody) {
  // Check if user exists
  const user = await this.findOne({ mail: reqBody.mail });
  if (!user) throw Error("user does not exist");

  // Compare the password
  const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
  if (!passwordMatch) throw Error("Incorrect Password");
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;