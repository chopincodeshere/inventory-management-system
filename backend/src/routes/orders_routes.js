const express = require("express");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  searchOrderByQuery,
  paymentVerification,
  getRazorApiKey,
} = require("../controllers/order_controller");

const router = express.Router();

router.route("/").get(getAllOrders).post(createOrder);
router.get("/search", searchOrderByQuery);
router.route("/key").get(getRazorApiKey);
router.route("/:id").get(getOrderById).patch(updateOrderStatus).delete(deleteOrder);
router.post("/payment-verification", paymentVerification);

module.exports = router;
