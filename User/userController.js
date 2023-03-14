var express= require("express")
var router=express.Router()
var userService=require("./userService")

router.post("/addUser/",userService.addUser)
router.get("/showUser/",userService.showUsers)
router.post("/delUser/:id",userService.deleteUser)
router.put("/updateUser/:id",userService.updateUser)
router.get("/search",userService.findUser)

module.exports = router;