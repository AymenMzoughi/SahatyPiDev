const express = require("express");
require("dotenv").config();
const cors = require("cors");
const stripe = require('stripe')('sk_test_51N30ouCsHIHt4OWhGtaZascVCW49qHBK21UCkoaf2Hnkf61DKIFIiVPxxcxJgOc6kTkeiaUGj5ob8dq2KhSosvXK004zTJYdbJ');

const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
const userRouter = require("./routes/user");
const ambulanceRouter = require("./routes/ambulance");
const medicalRecordRouter = require("./routes/medicalRecord");
const adminRouter = require("./routes/admin");
const doctorRouter = require("./routes/doctor");
const tipsRouter = require("./routes/tips");
const messageRoutes = require("./routes/messages");
const hospitalRouter = require("./routes/Controller");


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
app.use(express.static('public'));

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/ambulance", ambulanceRouter);
app.use("/medicalRecord", medicalRecordRouter);
app.use("/doctor", doctorRouter);
app.use("/tip", tipsRouter);
app.use("/api/messages", messageRoutes);
app.use("/hospital", hospitalRouter);

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
