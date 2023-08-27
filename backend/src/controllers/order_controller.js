const Order = require("../models/order");

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
    const newOrder = await Client.create(orderData);
    return res
      .status(201)
      .json({ newOrder, message: "Order added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error });
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
