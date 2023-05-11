
const Claim = require("../models/claim");

const addClaim = async (req, res) => {
    try {
      const { doctorName, description, subject, userId } = req.body;
      const claim = new Claim({
        userId,
        subject,
        doctorName,
        description,
        status: "pending",
      });
      const result = await claim.save();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  
  //update claim
  
  const updateClaim = async (req, res) => {
    try {
      const claimId = req.params.claimId;
      const { doctorName, description, date } = req.body;
      const updatedClaim = await Claim.findByIdAndUpdate(
        claimId,
        { doctorName, description, date },
        { new: true }
      );
      res.json(updatedClaim);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  const deleteClaim = async (req, res) => {
    try {
      const claimId = req.params.claimId;
      await Claim.findByIdAndDelete(claimId);
      res.json({ message: "Claim deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error" });
    }
  };

  module.exports = {
    updateClaim,
    deleteClaim,
    addClaim,
  }