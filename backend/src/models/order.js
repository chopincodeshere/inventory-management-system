const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  productID: String,
  productName: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true }, // A unique identifier for the order
  orderDate: { type: Date, required: true }, // The date and time the order was placed
  customerInfo: {
    name: String, // Customer's name
    address: String, // Customer's address
    phoneNumber: String, // Customer's phone number
    email: String, // Customer's email address
  },
  products: [productOrderSchema], // An array of product order items
  orderStatus: String, // The current status of the order
  shippingInfo: {
    address: String, // Shipping address
    method: String, // Shipping method
    trackingNumber: String, // Tracking number
  },
  paymentInfo: {
    method: String, // Payment method (e.g., credit card, PayPal)
    // Additional payment-related fields can be added here
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
