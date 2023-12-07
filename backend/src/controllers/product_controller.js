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
    console.log(error);
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

const getProductNames = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      // If no query provided, return all client names
      const productNames = await Product.find({}, "name");
      return res.status(200).json(productNames);
    }

    // Filter clients based on the query
    const matchingProducts = await Product.find(
      { name: { $regex: query, $options: "i" } },
      "name"
    );

    const matchingNames = matchingProducts.map((product) => product.name);

    res.status(200).json(matchingNames);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductByName = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      // If no query provided, return all client names
      const productNames = await Product.find({}, "name");
      return res.status(200).json(productNames);
    }

    // Find products with the exact name
    const matchingProduct = await Product.findOne({ name: query });

    res.status(200).json(matchingProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        ...req.body,
        uom: req.body.uom.uom,
        taxCategory: req.body.taxCategory.tax,
      },
      {
        new: true,
        runValidators: true,
        overWrite: true,
      }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByQuery = async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      const products = await Product.find({});

      res.status(200).json(products);
      return;
    }

    const keywordArray = keywords.split(",").map((keyword) => keyword.trim());

    // Create an array of regex patterns for each keyword
    const regexPatterns = keywordArray.map(
      (keyword) => new RegExp(keyword, "i")
    );

    // Use the $or operator to search across multiple fields
    const products = await Product.find({
      $or: [
        { name: { $in: regexPatterns } },
        { productCode: { $in: regexPatterns } },
        { uom: { $in: regexPatterns } },
        { hsnCode: { $in: regexPatterns } },
        { productType: { $in: regexPatterns } },
        { attributes: { $in: regexPatterns } },
        { batchNumber: { $in: regexPatterns } },
        { manufacturer: { $in: regexPatterns } },
        { "taxCategory.tax": { $in: regexPatterns } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
  getProductNames,
  getProductByName,
};
