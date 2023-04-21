
const Appointment = require("../models/appointmentModel");

// router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  const getInfoId =async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
};

//


exports.getInfoId=getInfoId