
const express = require('express');

const moment = require("moment");
const Appointment = require("../models/appointment");
const User = require("../models/user");
const { error } = require('winston');
const nodemailer = require('nodemailer');


const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById({ userId: req.body.userId });
    if (!appointment) {
      
      return res.status(404).send({
        message: "Appointment not found",
        success: false,
      });
    }

    if (appointment.status !== "pending") {
      return res.status(400).send({
        message: "Appointment cannot be canceled",
        success: false,
      });
  
    }
   
    appointment.status = "canceled";
    await appointment.save();

    const user = await User.findById(appointment.userId);
    user.unseenNotifications.push({
      type: "appointment-canceled",
      message: `Your appointment on ${appointment.date} at ${appointment.time} has been canceled`,
      onClickPath: "/user/appointments",
    });
    await user.save();

    res.status(200).send({
      message: "Appointment canceled successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error canceling appointment",
      success: false,
      error,
    });
  }
};

const checkBookingAvilability= async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const existingAppointment = await Appointment.findOne({
      date: moment(req.body.date, "DD-MM-YYYY").toISOString(),
      time: { $gte: fromTime, $lte: toTime },
      doctorId: req.body.doctorId,
    });

    if (existingAppointment) {
      return res.status(200).send({
        message: "Appointment not available",
        success: false,
      });
    }
    else {

    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${user.firstname} ${user.lastname}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};



const getAppointments = async (req, res) => {
  try {
    const userId = req.params.idUser;
    const status = "pending"
    console.log(userId);
    const appointments = await Appointment.find({ userId,status })
      .select('-doctorId')
      .populate('userId','firstname lastname')
      .lean()
      .exec();

    if (!appointments) {
      return res.status(404).json({ message: 'No Appoints found at the moment' });
    }

    const appointmentData = appointments.map((appointment) => ({
      patientname: `${appointment.userId.firstname} ${appointment.userId.lastname}`,
      date: `${appointment.date} at ${appointment.time}`,
      type: `${appointment.type}`,
      status: `${appointment.status}`,
      id: `${appointment._id}`
    }));
console.log(appointmentData)
    res.json(appointmentData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "getawayvoy.services@gmail.com",
    pass: "byoxgpbbfanfopju",
  },
});
const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: 'getawayvoy.services@gmail.com',
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

const changeAppointmentStatus = async (req, res) => {

  try {
    const {userId} = req.params
    const isDoctor = await User.findOne(userId)
    
  
    if ( isDoctor.role != "Docteur") {
      return res.status(403).json({ error: 'Unauthorized' });
    } else {
      const {appointmentId} = req.body;
      const status="approved"
      console.log(appointmentId)
      
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
        status,
      });
    
      if (appointment.type=="online"){
        const email=isDoctor.mail;
        const maxValue=10000;
        let randomInt = Math.floor(Math.random() * maxValue);
       
        const patientId=appointment.userId;
        console.log(patientId)
        const emailP=await User.findOne(patientId)
        console.log(emailP.mail)
        const rcpt=[emailP.mail,email]
        const subject = 'Room Number';
        const html = `Your room number is ,${randomInt}`;
        await sendMail(rcpt, subject, html);
      }

      const user = await User.findOne({ _id: appointment.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "appointment-status-changed",
        message: `Your appointment status has been changed to ${status}`,
        onClickPath: "/appointments",
      });

      await user.save();

      res.status(200).send({
        message: "Appointment status updated successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
};


const notificationsAsSeen=async (req, res) => {

  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
}
;
const deleteAllNotifications= async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
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



module.exports={
  bookAppointment,
  checkBookingAvilability,
  getAppointments,
  notificationsAsSeen,
  deleteAllNotifications,
  cancelAppointment,
  changeAppointmentStatus,

}