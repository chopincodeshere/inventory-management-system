const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const sendMail = async (req, res) => {
  const { recipient, subject, message, filename } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASS,
    },
  });

  mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: recipient,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: "fileName.pdf",
        path: path.join(
          __dirname,
          "..",
          "bills",
          `${filename.customerName}_${filename.orderId}.pdf`
        ),
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(201).json({ message: info.message });
    }
  });
};

module.exports = {
  sendMail,
};
