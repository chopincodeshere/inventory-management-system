const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
  },
  productCode: {
    type: String,
    required: [true, 'Must provide a product code'],
  },
  productType: {
    type: String,
    required: [true, 'Must provide a product type'],
  },
  uom: {
    type: String,
    required: [true, 'Must provide a unit of measurement'],
  },
  taxCategory: {
    type: String,
    required: [true, 'Must provide a tax category'],
  },
  hsnCode: {
    type: String,
    required: [true, 'Must provide an HSN code'],
  },
  price: {
    type: Number,
    required: [true, 'Must provide a price'],
  },
  quantity: {
    type: Number,
    required: [true, 'Must provide a quantity'],
  },
  description: {
    type: String,
  },
  image: String,
  attributes: String,
  batchNumber: String,
  barcode: String,
  manufacturer: {
    type: String,
    required: [true, 'Must provide a manufacturer'],
  },
});

module.exports = mongoose.model("Product", productSchema);
