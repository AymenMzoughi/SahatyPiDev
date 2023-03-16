let UserModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Login
const loginUser =  async (req,res) => {
    try {
      const user = await UserModel.login(req.body)
      // Generate a JWT token
      const token = await jwt.sign({userId:user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json(error.message );
    }}
//Sign up
    const signUpUser = async (req,res)=>{
      const reqBody = req.body
      try{
        const user = await UserModel.signUp(reqBody)
         // Generate a JWT token
      const token = await jwt.sign({userId:user._id}, process.env.JWT_SECRET, { expiresIn: "1d" });
  
        res.status(200).json({"email":reqBody.email ,token})
      }
      catch(error){
        res.status(400).json(error.message)
      }
    }
//Edit 
    const editUser=(req,res)=>{
      UserModel.find({"email":req.body.email},(err,user)=>{
        
      })
    }
//Get
  const getUser=(req, res) => {
      UserModel.findById(req.userId).then((data)=>{
        res.json(data)
      }).catch(err=>res.status(400).json(err))
    }
//GetAll
  // const getAllUsers=(req,res)=>{
  //     UserModel.find().then((data)=>res.json(data)).catch(err=>res.status(400).json(err))
  
  // }
  //ADD
  const addUser=(req,res)=>{
     const newUser = new UserModel(req.body)
      newUser.save()
              .then(()=>res.json('User added successfully !'))
               .catch(err=>res.status(400).json('Error: '+err))
      
  }
  
module.exports = {signUpUser,addUser,loginUser,getUser,editUser} ; 