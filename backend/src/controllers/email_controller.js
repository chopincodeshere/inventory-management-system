const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  const recipient = req.body.reciepient;

  // Create a transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service (e.g., 'Gmail', 'Outlook')
    auth: {
      user: process.env.SENDER_EMAIL, // Replace with your email address
      pass: process.env.SENDER_PASS, // Replace with your email password or an app-specific password
    },
  });

  // Email message options
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender's email address
    to: recipient, // Recipient's email address
    subject: "Hello from Node.js", // Email subject
    text: "This is a test email from Node.js", // Plain text email content
    // You can also include HTML content using the "html" property
    // html: '<h1>Hello from <i>Node.js</i></h1>',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  sendMail,
};
