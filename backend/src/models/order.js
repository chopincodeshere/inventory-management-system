const mongoose = require("mongoose");

const productOrderSchema = new mongoose.Schema({
  productName: String,
  productId: String,
  quantity: Number,
  price: Number,
  gstDetails: String,
  discount: Number,
  description: String,
  hsnCode: String,
  taxCategory: {
    key: String,
    tax: String,
  },
  taxAmount: Number,
  images: String,
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
    amount: Number,
  },
  dueDate: Date
});

module.exports = mongoose.model("Order", orderSchema);
