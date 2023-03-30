var mongoose=require("mongoose")
var Schema=mongoose.Schema

var User=new Schema({
    firstname:String,
    lastname:String,
    mail:String,
    numero: String,
    password: String,
    pdp: String,
    role: String,
    docVerif: String,
})

module.exports= mongoose.model("user",User)