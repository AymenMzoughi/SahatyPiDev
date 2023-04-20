
const express = require("express");
const app = express();
app.use(express.static('uploads'));
const cors = require('cors');
const mongoose = require("mongoose");
var medicalrecordRoutes = require("./MedicalRecord/Controller");
var AmbulanceRoutes = require("./Ambulance/Controller")


// Allow requests from the origin of your React application
const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Add the CORS middleware to your server
app.use(cors(corsOptions));

// Route to handle image requests with CORS headers
app.get('/uploads/', function (req, res) {
  const imagePath = path.join(__dirname, 'GestionMedicalRecord/uploads');
  res.sendFile(imagePath);
});

// app.get('/uploads/', cors(corsOptions), function (req, res) {
//   const { filename } = req.params;
//   const filePath = path.join(__dirname, 'GestionMedicalRecord/uploads', filename);
//   const fileExtension = path.extname(filePath);

//   if (fileExtension === '.pdf') {
//     const stat = fs.statSync(filePath);
//     res.writeHead(200, {
//       'Content-Type': 'application/pdf',
//       'Content-Length': stat.size,
//     });
//     const readStream = fs.createReadStream(filePath);
//     readStream.pipe(res);
//   } else {
//     res.sendFile(filePath);
//   }
// });


app.use(express.json())
app.use("/MedicalRecord", medicalrecordRoutes);
app.use("/Ambulance",AmbulanceRoutes );

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


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
