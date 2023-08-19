const bwipjs = require("bwip-js");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createProduct = async (req, res) => {
  try {
    let product = req.body;

    product.taxCategory = product.taxCategory.tax;
    product.uom = product.uom.uom;

    if (product.productCode) {
      // Generate barcode image
      const barcodeOptions = {
        bcid: "code128", // Barcode type: Code 128
        text: product.productCode, // Barcode text
        scale: 3, // Scale factor for the barcode image
        height: 10, // Height of the barcode bars in millimeters
        includetext: true, // Include the encoded text in the barcode
      };

      // Generate barcode image as a base64-encoded string
      const barcodeImageBuffer = await new Promise((resolve, reject) => {
        bwipjs.toBuffer(barcodeOptions, (err, png) => {
          if (err) {
            return reject(err);
          }
          resolve(png);
        });
      });

      // Convert the barcode image buffer to a base64-encoded string
      const barcodeImageBase64 = barcodeImageBuffer.toString("base64");

      // Store product in the database with the barcode image
      product.barcode = barcodeImageBase64;
    }
    const createdProduct = await Product.create(product);

    res.status(201).json({ product: createdProduct });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const updateProduct = (req, res) => {};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params; // Corrected object destructuring
    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
