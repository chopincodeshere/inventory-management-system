const express = require("express");

const {
  getAllClients,
  getClient,
  getClientByQuery,
  addClient,
  updateClient,
  deleteClient,
  getClientsByName,
  getClientByName,
  addCreditAmount
} = require("../controllers/client_controller");

const router = express.Router();

router.route("/").get(getAllClients).post(addClient);
router.route("/search").get(getClientByQuery);
router.route("/autocomplete").get(getClientsByName)
router.route("/name").get(getClientByName)
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);
router.route("/credit/:id").patch(addCreditAmount)

module.exports = router;
