const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    nom: { type: String, required: true },
   prenom:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   numero:{type:Number,required:true},
   password:{type:String,required:true},
   role:{type:String,required:false,default:"Patient"},
  },
  { timestamps: false }
);

//Sign up static method
userSchema.statics.signUp = async function(reqBody){
  const emailExists= await this.findOne({"email":reqBody.email})
  if(emailExists)
  throw(Error("Email already exists !"))
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(reqBody.password,salt)
  reqBody.password = hash;
  const user = this.create(reqBody)
  return user ;
}

//Login static method 
userSchema.statics.login = async function(reqBody){
      
      // Check if user exists
      const user = await this.findOne({"email": reqBody.email });
      if (!user) throw(Error("user does not exist" ))

      // Compare the password
      const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
      if (!passwordMatch) throw(Error("Incorrect Password"))
  return user ;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
