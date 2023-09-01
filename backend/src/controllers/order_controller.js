const Order = require("../models/order");
const Razorpay = require("razorpay");

const ID = process.env.RAZORPAY_SECRET_ID;
const KEY = process.env.RAZORPAY_API_KEY;
var instance = new Razorpay({
  key_id: ID,
  key_secret: KEY,
});

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
  const orderData = req.body;

  try {
    // Create a Razorpay order
    const razorpayOrder = await instance.orders.create({
      amount: orderData.price, // The order amount in paise (e.g., 1000 paise = ₹10)
      currency: "INR", // Currency code (e.g., INR for Indian Rupees)
      receipt: "order_receipt", // A unique order receipt ID
    });

    const newOrder = await Order.create(orderData);

    return res.status(201).json({
      razorpayOrderId: razorpayOrder._id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      message: "Razorpay order created successfully!",
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

const updateOrder = async (req, res) => {};

const deleteOrder = async (req, res) => {};

const searchOrderByQuery = async (req, res) => {};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  searchOrderByQuery,
};
