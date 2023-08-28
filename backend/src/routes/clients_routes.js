const express = require("express");

const {
  getAllClients,
  getClient,
  getClientByQuery,
  addClient,
  updateClient,
  deleteClient,
  getClientByName,
} = require("../controllers/client_controller");

const router = express.Router();

router.route("/").get(getAllClients).post(addClient);
router.route("/search").get(getClientByQuery);
router.route("/autocomplete").get(getClientByName)
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);

module.exports = router;
