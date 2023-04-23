const User = require("../models/user");
const Claim = require("../models/claim");
const Doctor = require("../models/doctor");
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};
const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });

    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();

    res.status(200).send({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};
const pendingClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ status: "pending" }).populate("userId");
    res.json(claims);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const markClaimAsProcessed = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }
    claim.status = "processed";
    const updatedClaim = await claim.save();
    res.json(updatedClaim);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }
    await claim.remove();
    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  deleteClaim,
  getAllDoctors,
  getAllUsers,
  markClaimAsProcessed,
  changeAccountStatus,
  pendingClaims,
};
