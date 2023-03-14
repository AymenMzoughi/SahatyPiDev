
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var userRoutes = require("./User/userController");
app.use(express.json())
app.use("/User", userRoutes);

// Database
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      'mongodb+srv://Tester:Tester123@cluster0.l97obut.mongodb.net/Sahati?retryWrites=true&w=majority',
      connectionParams
    );
    console.log("Database connected succesfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});

database();


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
