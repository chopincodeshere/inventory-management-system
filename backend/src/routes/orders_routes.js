const express = require("express");

const {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  searchOrderByQuery,
} = require("../controllers/order_controller");
const { getClientByQuery } = require("../controllers/client_controller");

const router = express.Router();

router.route("/").get(getAllOrders).post(addOrder);
router.route("/:id").get(getOrderById).patch(updateOrder).delete(deleteOrder);
router.get("/search", searchOrderByQuery);

module.exports = router;
