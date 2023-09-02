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
router.route("/key").get(getRazorApiKey);
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder);
router.route("/payment-verification").post(paymentVerification);
router.get("/search", searchOrderByQuery);

module.exports = router;
