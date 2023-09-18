const nodemailer = require("nodemailer");
const Order = require("../models/order");
const Client = require("../models/client");
const cron = require("node-cron");
require("dotenv").config();

// Create a function to send payment reminders
const sendPaymentReminder = async (order) => {
  const client = await Client.findOne({
    name: order.customerName,
  });
  // Calculate the due date (30 days from the current date)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  // Check if the client's due date is today or earlier
  if (order.dueDate <= dueDate && client.creditDetails.total > 0) {
    // Send a payment reminder email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: client.email,
      subject: "Payment Reminder",
      text: `Dear ${
        order.customerName
      }, please remember to pay your credit amount of $${
        order.paymentDetails.amount
      } by ${order.dueDate.toDateString()}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Payment reminder sent to ${client.name} at ${client.email}`);
    } catch (error) {
      console.error(`Error sending email to ${client.name}: ${error.message}`);
    }
  }
};

const notify = cron.schedule("0 0 * * *", async () => {
  try {
    // Find orders with credit amounts and due dates
    const orders = await Order.find({
      dueDate: {
        $ne: null,
        $lte: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Find orders due in 2 days
      },
    });

    // Send reminders to eligible orders
    orders.forEach((order) => sendPaymentReminder(order));
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
});

notify.start();

module.exports = notify;
