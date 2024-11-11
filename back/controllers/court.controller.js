const Court = require("../models/court");
const Content = require("../models/content");
// const User = require("../models/user");

const courtControllers = {};

courtControllers.bookingCourt = async (req, res) => {
  const {
    timeBooked,
    dayBooked,
    courtBooked,
    userBooked,
    monthBooked,
    yearBooked,
  } = req.body;

  // TODO: this should be transaction ACID, when 1 timeBooked court fail others
  // must also fail

  console.log(req.body);
  for (const time of timeBooked) {
    try {
      await Court.create({
        timeBooked: time,
        dayBooked,
        courtBooked,
        userBooked,
        monthBooked,
        yearBooked,
      });
    } catch (error) {
      console.error("Error occurred while inserting the booking:", error);
      res.status(500).send("An error occurred while adding the booking.");
      return;
    }
  }
  res.status(201).json({ message: "Booking added successfully!" });
};

courtControllers.deleteCourt = async (req, res) => {
  const {
    courtBooked,
    timeBooked,
    dayBooked,
    monthBooked,
    yearBooked,
    userBooked,
  } = req.body;
  console.log(req.body);
  try {
    const deletedCount = await Court.destroy({
      where: {
        courtBooked: courtBooked,
        timeBooked: timeBooked,
        dayBooked: dayBooked,
        userBooked: userBooked,
        yearBooked: yearBooked,
        monthBooked: monthBooked,
      },
    });
    if (deletedCount > 0) {
      res.status(200).json({ message: "Court was deleted successfully" });
    } else {
      res.status(404).json({ message: "Court not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "There was an error with deleting the court" });
  }
};

courtControllers.bookedCourt = async (_, res) => {
  const bookings = await Court.findAll({
    attributes: [
      "timeBooked",
      "courtBooked",
      "dayBooked",
      "yearBooked",
      "monthBooked",
      "id",
      "userBooked",
    ],
  });
  res.json(bookings);
};

courtControllers.postAnnoucement = async (req, res) => {
  try {
    const { content } = req.body;
    let updatedContent = await Content.upsert(
      { content: content },
      { returning: true },
    );
    res.status(200).json(updatedContent[0]);
  } catch (error) {
    console.error("Error posting content:", error);
    res.status(500).json({ error: "Could not post content" });
  }
};

courtControllers.getAnnoucement = async (_, res) => {
  const data = await Content.findAll({
    attributes: ["content"],
  });
  res.json(data);
};

module.exports = courtControllers;
