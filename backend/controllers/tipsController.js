const TipModel = require("../models/tipsModel");
const nodemailer = require("nodemailer");


const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    UNABLE_TO_ADD: 'Unable to add',
    USER_NOT_FOUND: 'Tip not found',
  }

  const addTips = async (req, res, next) => {
    const {title ,description,month}=req.body;
    const {picture,tippdf,video}=req.files;

    const tip = new TipModel({
        title: req.body.title,
        description: req.body.description,
        picture:(picture && picture[0].filename)||null,
        tippdf:(tippdf && tippdf[0].filename)||null,
        video:(video && video[0].filename)||null,
        month:req.body.month

    });
    tip.save().then(() => {
        console.log(title, description);
        console.log(picture);
        res.status(201).json({
            message: 'Tip added successfully'
        });
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
  };

  const getTips = async (req, res) => {
    try {
      const docs = await TipModel.find({});
      res.json(docs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:error });
    }
  };

  
const deleteTip = async (req, res, next) => {
    try {
      const tipToDelete = await TipModel.findById(req.params.id, 'title');
      if (!tipToDelete) {
        return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      await TipModel.findByIdAndDelete(req.params.id);
      const docs = await TipModel.find({});
      res.status(200).json({ message: `Tip ${tipToDelete.title} is deleted!`, docs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

const updateTip = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedTip = await TipModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true, // pour renvoyer le document mis à jour plutôt que l'ancien document
      });
      if (!updatedTip) {
        return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      res.json(updatedTip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  const searchTipsBytitle = async(req, res)=>{
    try {
      const { title } = req.params;
      const tips = await TipModel.find({ title: { $regex: title, $options: 'i' } });
      res.status(200).json(tips);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
};
const sendEmail = async(req,res) => {
  const email = req.body.email;
  const roomCode = req.body.roomCode;
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
  service:'gmail',
    auth: {
      user: 'mhamdianwer9@gmail.com',
      pass: 'pvkvucnortxyttob'
    }
  });

  // Construct the email message
  const message = {
    from: "mhamdianwer9@gmail.com",
    to: email,
    subject: "Join Video Chat Room",
    text: `Here is the link to join the video chat room: http://localhost:3000/room/${roomCode}`,
  };

  // Send the email using the transporter
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
};


  module.exports = { addTips ,getTips,deleteTip,updateTip,searchTipsBytitle,sendEmail};

