const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
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
app.use(cors());
app.use(express.json());

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connected");
});
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/ambulance", ambulanceRouter);
app.use("/medicalRecord", medicalRecordRouter);
app.use("/doctor", doctorRouter);

app.listen(port, () => {
  console.log("server is running on port 5000");
});
