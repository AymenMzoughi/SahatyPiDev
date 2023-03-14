const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type:String ,
        required: true
    },
    lastname:{
        type:String,
        require: true
    },
    Number:{
        type:Number,
        require:true
    },
    pdp:{
        type:String,
        require:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {type: String},
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    token: {
        type: String,
    },
    resetToken: {type:String,
    }
   
});

module.exports = mongoose.model("User" , userSchema);