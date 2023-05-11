var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Tip=new Schema({
    title:String,
    description:String,
    picture:String,
    tippdf:String,
    video:String,
    month: String 


})

module.exports= mongoose.model("tip",Tip)