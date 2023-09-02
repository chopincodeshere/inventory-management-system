const Razorpay = require("razorpay");
require("dotenv").config();

const ID = process.env.RAZORPAY_SECRET_ID;
const KEY = process.env.RAZORPAY_API_KEY;

const razorpayConfig = {
  key_id: ID,
  key_secret: KEY,
};

var instance = new Razorpay(razorpayConfig);

module.exports = instance
