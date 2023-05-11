const moment = require("moment");
const Event = require("../models/event");
const User = require("../models/user");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (!events) {
      return res.status(404).json({ message: "No Events found at the moment" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ message: "No such event found at the moment" });
    } else res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(event);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const participate = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    const user = await User.findById(req.body.userId);
    user.events.push(req.body.eventId);
    event.participants.push(req.body.userId);
    await user.save();
    await event.save();
    res.json({ message: "Joined The event successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const cancelParticipation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { events: req.param.eventId } },
      { new: true }
    );
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $pull: { participants: req.params.userId } },
      { new: true }
    );
    await user.save();
    await event.save();
    res.json({ message: "Unjoined the Event" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  addEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  participate,
  cancelParticipation,
};
