const express = require("express");

const {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  searchOrderByQuery,
  paymentVerification,
  getRazorApiKey,
} = require("../controllers/order_controller");

const router = express.Router();

router.route("/").get(getAllOrders).post(addOrder);
router.route("/payment-verification").post(paymentVerification);
router.route("/key").get(getRazorApiKey);
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder);
router.get("/search", searchOrderByQuery);

module.exports = router;
