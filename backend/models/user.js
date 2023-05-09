const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  numero: {
    type: Number,
    require: true,
  },
  pdp: {
    type: String,
    require: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  website: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  specialization: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  feePerCunsultation: {
    type: Number,
    required: false,
  },
  timings: {
    type: Array,
    required: false,
  },
  status: {
    type: String,
    default: "pending",
  },


  resetToken: { type: String },

   seenNotifications: {
     required: false,
     type: Array,
     default: [],
   },
   unseenNotifications: {
    required: false,
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