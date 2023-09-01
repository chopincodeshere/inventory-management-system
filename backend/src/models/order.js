const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  productId: String, // Change from productID to productId
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, // Replace orderNumber with customerId
  date: { type: Date, required: true }, // Replace orderDate with date
  status: String,
  items: [productOrderSchema], // Use the productOrderSchema
  shippingAddress: String,
  billingAddress: String,
  paymentDetails: {
    credit: Boolean,
    cardNumber: String,
    cardType: String,
    expirationDate: Date,
  },
});

module.exports = mongoose.model("Order", orderSchema);
