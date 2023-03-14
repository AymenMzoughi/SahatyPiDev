var express= require("express")
var router=express.Router()
var userService=require("./userService")

router.post("/addUser/",userService.addUser)


module.exports = router;