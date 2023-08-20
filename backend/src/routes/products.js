const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
} = require("../controllers/product_controller");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.get("/search", getProductByQuery);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
