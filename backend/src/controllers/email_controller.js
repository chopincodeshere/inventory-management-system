const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  res.status(201).json({ message: "Mail sent" });
};

module.exports = {
  sendMail,
};
