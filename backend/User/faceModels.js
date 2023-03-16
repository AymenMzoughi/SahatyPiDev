var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Face=new Schema({
    faceData: String, 

})

module.exports= mongoose.model("face",Face)