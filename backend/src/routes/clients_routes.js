const express = require("express");

const {
  getAllClients,
  getClientById,
  getClientByQuery,
  addClient,
  updateClient,
  deleteClient,
  getClientsByName,
  getClientByName,
  addCreditAmount,
  addTotalSales
} = require("../controllers/client_controller");

const router = express.Router();

router.route("/").get(getAllClients).post(addClient);
router.route("/search").get(getClientByQuery);
router.route("/autocomplete").get(getClientsByName)
router.route("/name").get(getClientByName)
router.route("/:id").get(getClientById).patch(updateClient).delete(deleteClient);
router.route("/credit/:id").patch(addCreditAmount);
router.route("/sales/:id").patch(addTotalSales)

module.exports = router;
