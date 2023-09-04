const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  productId: String, // Change from productID to productId
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, 
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true },
  date: { type: Date, required: true }, // Replace orderDate with date
  status: String,
  items: [productOrderSchema], // Use the productOrderSchema
  shippingAddress: String,
  billingAddress: String,
  paymentDetails: {
    credit: Boolean,
    amount: Number
  },
});

module.exports = mongoose.model("Order", orderSchema);
