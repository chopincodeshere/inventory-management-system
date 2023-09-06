const Order = require("../models/order");
const instance = require("../config/paymentconfig");
const Client = require("../models/client");
const crypto = require("crypto");

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
  const { amount, order } = req.body;

  const client = await Client.findOne({ name: req.body.customerName });

  try {
    let razorpayOrder; // Declare the variable here
    let newOrder = await Order.create(order);

    if (req.body.payDetails.credit) {
      // Execute this block if addCredit() is executed
      // Create an invoice using easyinvoice
      const invoiceData = {
        documentTitle: "Invoice", // The title of the invoice
        currency: "INR", // Currency code
        taxNotation: "GST", // Tax notation (e.g., GST, VAT, etc.)
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        sender: {
          company: "Kalyan Traders",
          address:
            "GF-46, Nilkanth Complex, Rinki-Safari Chowkdi Road, Opp.Samarth Enterprose, Halol GIDC",
          city: "Halol",
          zip: "389350",
          state: "Gujarat",
          country: "India",
        },
        client: {
          company: req.body.customerName,
          address: req.body.billingAddress,
          city: client.city,
          zip: client.pincode,
          country: client.country,
        },
        invoiceNumber: newOrder._id,
        invoiceDate: new Date().toISOString().slice(0, 10), // Current date
        products: req.body.items,
      };

      const pdfBuffer = await easyinvoice.createInvoice(invoiceData); // Generate PDF invoice
      fs.writeFileSync("invoice.pdf", pdfBuffer, "base64"); // Save the PDF to a file

      res.status(201).json({
        newOrder: newOrder,
        message: "Invoice created successfully!",
        invoice: pdfBuffer,
      });
    } else {
      // Execute this block if payDetails.credit is true
      // Create a Razorpay order
      razorpayOrder = await instance.orders.create({
        amount: Number(amount * 100), // The order amount in paise (e.g., 1000 paise = ₹10)
        currency: "INR", // Currency code (e.g., INR for Indian Rupees)
        receipt: "order_receipt", // A unique order receipt ID
      });

      // Create an invoice using easyinvoice
      const invoiceData = {
        documentTitle: "Invoice", // The title of the invoice
        currency: "INR", // Currency code
        taxNotation: "GST", // Tax notation (e.g., GST, VAT, etc.)
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        sender: {
          company: "Kalyan Traders",
          address:
            "GF-46, Nilkanth Complex, Rinki-Safari Chowkdi Road, Opp.Samarth Enterprose, Halol GIDC",
          city: "Halol",
          zip: "389350",
          state: "Gujarat",
          country: "India",
        },
        client: {
          company: req.body.customerName,
          address: req.body.billingAddress,
          city: client.city,
          zip: client.pincode,
          country: client.country,
        },
        invoiceNumber: newOrder._id,
        invoiceDate: new Date().toISOString().slice(0, 10), // Current date
        products: req.body.items,
      };

      const pdfBuffer = await easyinvoice.createInvoice(invoiceData); // Generate PDF invoice
      fs.writeFileSync("invoice.pdf", pdfBuffer, "base64"); // Save the PDF to a file

      res.status(201).json({
        order: razorpayOrder,
        newOrder: newOrder,
        message: "Razorpay order and invoice created successfully!",
        invoice: pdfBuffer,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Razorpay order and invoice" });
  }
};

const paymentVerification = async (req, res) => {
  console.log("Hi");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    console.log("Hi");

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:4200/orders/create-order/billing-info?reference=${razorpay_payment_id}`
    );

    res.status(200).json({
      message: "Payment successful!",
    });
  } else {
    res.status(400).json({
      success: false,
    });
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
    return res.status(200).json({ key: process.env.RAZORPAY_SECRET_ID });
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
  getRazorApiKey,
};
