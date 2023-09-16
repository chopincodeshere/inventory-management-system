const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

function base64ToPDF(base64String) {
  // Remove the data URI prefix (e.g., "data:application/pdf;base64,")
  const base64Data = base64String.replace(/^data:application\/pdf;base64,/, "");

  // Create a buffer from the base64 data
  const pdfBuffer = Buffer.from(base64Data, "base64");

  return pdfBuffer;
}

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
