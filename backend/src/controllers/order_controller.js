const Order = require("../models/order");
const instance = require("../config/paymentconfig");
const easyinvoice = require("easyinvoice");
const Client = require("../models/client");
const crypto = require("crypto");
const { v4: uuid } = require("uuid");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getOrderById = async (req, res) => {};

const createOrder = async (req, res) => {
  const { amount, order } = req.body;

  const newOrder = await Order.create(order);

  const client = await Client.findOne({
    name: { $regex: new RegExp(order.customerName, "i") },
  });

  const currentDate = new Date();
  let invoice;

  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
    },
    sender: {
      company: "Kalyan Traders",
      address:
        "GF-46, Nilkanth Complex, Rinki-Safari Chowkdi Road, Opp.Samarth Enterprose, Halol GIDC",
      zip: "389350",
      state: "Gujarat",
      city: "Halol",
      country: "India",
    },
    client: {
      company: client.name,
      address: client.address,
      zip: client.pincode,
      state: client.state,
      city: client.city,
      country: client.country,
    },
    information: {
      number: newOrder._id,
      date: new Date().toISOString().slice(0, 10),
      "due-date": new Date(currentDate.setDate(currentDate.getDate() + 30))
        .toISOString()
        .slice(0, 10),
    },
    products: order.items.map((item) => ({
      quantity: item.quantity,
      description: item.description,
      "tax-rate": item.gstDetails,
      price: item.price,
    })),
    "bottom-notice": "Kindly pay your invoice within 30 days.",
    settings: {
      currency: "INR",
      "tax-notation": "GST",
    },
  };

  try {
    if (!order.paymentDetails.credit) {
      const razorpayOrder = await instance.orders.create({
        amount: Number(amount * 100), // The order amount in paise (e.g., 1000 paise = ₹10)
        currency: "INR", // Currency code (e.g., INR for Indian Rupees)
        receipt: "order_receipt", // A unique order receipt ID
      });

      easyinvoice.createInvoice(data, function (result) {
        invoice = result.pdf;

        res.status(201).json({
          order: razorpayOrder,
          newOrder: newOrder,
          message: "Razorpay order and invoice created successfully!",
          invoice: invoice,
        });
      });
    } else {
      easyinvoice.createInvoice(data, async function (result) {
        invoice = await result.pdf;

        res.status(201).json({
          order: newOrder._id,
          newOrder: newOrder,
          message: "Amount credited successfully!",
          invoice: invoice,
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error" });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
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
  createOrder,
  updateOrder,
  deleteOrder,
  searchOrderByQuery,
  paymentVerification,
  getRazorApiKey,
};
