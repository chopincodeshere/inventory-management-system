const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
  getProductNames,
  getProductByName
} = require("../controllers/product_controller");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.get("/search", getProductByQuery);
router.route("/autocomplete").get(getProductNames)
router.route("/name").get(getProductByName)
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
