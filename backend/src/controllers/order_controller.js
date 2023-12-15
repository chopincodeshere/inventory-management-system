const Order = require("../models/order");
const instance = require("../config/paymentconfig");
const easyinvoice = require("easyinvoice");
const Client = require("../models/client");
const crypto = require("crypto");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const notify = require("../controllers/notification_controller")

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const totalRecords = await Order.countDocuments();
    const totalPages = Math.ceil(totalRecords / pageSize);

    const orders = await Order.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      orders,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ message: `Order with id: ${id} not found` }); // Return to stop further execution
    }

    return res.status(200).json(order); // Also return here
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  const { amount, order } = req.body;
  const orderNumber = uuidv4();
  const destinationDirectory =
    "D:\\MEAN Stack\\inventory-management-system\\backend\\src\\bills";

  const dueDate = new Date();

  const newOrder = await Order.create({
    ...order,
    orderNumber,
    dueDate: dueDate.setDate(dueDate.getDate() + 30),
  });

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
      logo: fs.readFileSync(
        "D:\\MEAN Stack\\inventory-management-system\\backend\\src\\assets\\KayanTraders.png",
        "base64"
      ),
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
      "GST Number": client.gstNumber,
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
      "tax-rate": item.taxAmount,
      price: item.price,
    })),
    "bottom-notice": "Kindly pay your invoice within 30 days.",
    settings: {
      currency: "INR",
      "tax-notation": "GST",
    },
  };

  try {
    const filePath = path.join(
      destinationDirectory,
      `${newOrder.customerName}_${newOrder._id}.pdf`
    );

    if (!order.paymentDetails.credit) {
      const razorpayOrder = await instance.orders.create({
        amount: Number(amount * 100), // The order amount in paise (e.g., 1000 paise = ₹10)
        currency: "INR", // Currency code (e.g., INR for Indian Rupees)
        receipt: "order_receipt", // A unique order receipt ID
      });

      easyinvoice.createInvoice(data, async function (result) {
        invoice = await result.pdf;

        try {
          await fs.writeFileSync(filePath, invoice, "base64");
        } catch (err) {
          console.error(`Error writing the file: ${err.message}`);
        }

        return res.status(201).json({
          order: razorpayOrder,
          newOrder: newOrder,
          message: "Razorpay order and invoice created successfully!",
          invoice: invoice,
        });
      });
    } else {
      // Calculate the new total credit amount
      try {
        const updatedTotalCredit = client.creditDetails.total
          ? client.creditDetails.total + amount
          : amount;

        // Create a new credit item
        const creditItem = {
          productName: "Credit Payment",
          productId: "credit-payment",
          quantity: 1,
          price: amount * 100,
          gstDetails: "NA",
          discount: 0,
          description: "Credit payment",
          hsnCode: "NA",
          taxCategory: {
            key: "NA",
            tax: "NA",
          },
          taxAmount: 0,
          images: "NA",
          date: new Date().toISOString().slice(0, 10),
        };

        // Push the new credit item to the client's creditDetails.items array
        client.creditDetails.items.push(creditItem);

        // Update the total credit amount and credit items
        client.creditDetails.total = updatedTotalCredit;

        // Save the updated client document
        await client.save();
      } catch (error) {
        console.log(error);
      }

      easyinvoice.createInvoice(data, async function (result) {
        invoice = await result.pdf;

        try {
          fs.writeFileSync(filePath, invoice, "base64");
        } catch (err) {
          console.error(`Error writing the file: ${err.message}`);
        }

        return res.status(201).json({
          order: newOrder._id,
          newOrder: newOrder,
          message: "Amount credited successfully!",
          invoice: invoice,
        });
      });
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
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

const updateOrderStatus = async (req, res) => {};

const deleteOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.findOneAndDelete({ _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res
      .status(200)
      .json({ message: "Order has been removed successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const searchOrderByQuery = async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      const orders = await Order.find({});

      return res.status(200).json(orders); // Updated to return orders
    }

    const keywordArray = keywords.split(",").map((keyword) => keyword.trim());

    // Create an array of regex patterns for each keyword
    const regexPatterns = keywordArray.map(
      (keyword) => new RegExp(keyword, "i")
    );

    const orders = await Order.find({
      $or: [
        { customerName: { $in: regexPatterns } }, // Updated field name
        { customerEmail: { $in: regexPatterns } }, // Updated field name
        { customerContact: { $in: regexPatterns } }, // Updated field name
        { _id: { $in: keywordArray } },
      ],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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
  updateOrderStatus,
  deleteOrder,
  searchOrderByQuery,
  paymentVerification,
  getRazorApiKey,
};
