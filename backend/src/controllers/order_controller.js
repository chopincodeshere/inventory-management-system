const Order = require("../models/order");
const instance = require("../config/paymentconfig");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOrderById = async (req, res) => {};

const addOrder = async (req, res) => {
  const amount = req.body.amount;

  try {
    // Create a Razorpay order
    const razorpayOrder = await instance.orders.create({
      amount: Number(amount) / 100, // The order amount in paise (e.g., 1000 paise = ₹10)
      currency: "INR", // Currency code (e.g., INR for Indian Rupees)
      receipt: "order_receipt", // A unique order receipt ID
    });

    // const newOrder = await Order.create(orderData);

   res.status(201).json({
      order: razorpayOrder,
      message: "Razorpay order created successfully!",
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    // const newOrder = await Order.create(orderData);

    return res.status(201).json({
      order: razorpayOrder,
      message: "Razorpay order created successfully!",
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    return res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

const updateOrder = async (req, res) => {};

const deleteOrder = async (req, res) => {};

const searchOrderByQuery = async (req, res) => {};

const getRazorApiKey = (req, res) => {
  try {
    if (!process.env.RAZORPAY_API_KEY) {
      throw new Error("RAZORPAY_API_KEY not found in environment variables.");
    }
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    return res.status(500).json({ message: "Error from the server side" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  searchOrderByQuery,
  paymentVerification,
  getRazorApiKey
};
