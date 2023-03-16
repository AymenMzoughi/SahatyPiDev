const router = require('express').Router()
const userController = require('../controllers/userController')
const requireAuth = require("../middleware/requireAuth") 
router.post("/register",userController.signUpUser)
router.post("/login",userController.loginUser);
// Protected route
router.use(requireAuth)
router.get('/login', userController.getUser);
router.put('/login', userController.editUser);

module.exports = router ; 