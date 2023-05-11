const express = require("express");
require("dotenv").config();
const app = express();
// app.use(express.static('uploads'));
app.use(express.static('public'));
const cors = require('cors');
const stripe = require('stripe')('sk_test_51N30ouCsHIHt4OWhGtaZascVCW49qHBK21UCkoaf2Hnkf61DKIFIiVPxxcxJgOc6kTkeiaUGj5ob8dq2KhSosvXK004zTJYdbJ');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
const userRouter = require("./routes/user");
const ambulanceRouter = require("./routes/ambulance");
const medicalRecordRouter = require("./routes/medicalRecord");
const appointmentRouter = require("./routes/appointment");
const PharmacyRouter = require('./routes/pharmacy');
const MedRouter = require('./routes/med');
const ClaimRouter = require('./routes/claim')
const tipsRouter = require("./routes/tips");
const hospitalRouter = require("./routes/hospital");
const eventRouter = require("./routes/events");

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
app.use("/ambulance", ambulanceRouter);
app.use("/medicalRecord", medicalRecordRouter);
app.use("/appointment",appointmentRouter);
app.use('/pharmacy', PharmacyRouter);
app.use('/med', MedRouter);
app.use('/claim', ClaimRouter)
app.use("/tip", tipsRouter);
app.use("/hospital", hospitalRouter);
app.use("/events", eventRouter);
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Chat Video Sehaty",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})
app.listen(port, () => {
  console.log("server is running on port 5000");
});