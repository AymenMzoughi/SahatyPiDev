const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.static('uploads'));
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
const userRouter = require("./routes/user");
const ambulanceRouter = require("./routes/ambulance");
const medicalRecordRouter = require("./routes/medicalRecord");
const adminRouter = require("./routes/admin");
const doctorRouter = require("./routes/doctor");
mongoose.set("strictQuery", false);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connected");
});

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


// Add the CORS middleware to your server
app.use(cors(corsOptions));

// Route to handle image requests with CORS headers
app.get('/uploads/', function (req, res) {
  const imagePath = path.join(__dirname, 'backend/uploads');
  res.sendFile(imagePath);
});
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/ambulance", ambulanceRouter);
app.use("/medicalRecord", medicalRecordRouter);
app.use("/doctor", doctorRouter);

app.listen(port, () => {
  console.log("server is running on port 5000");
});