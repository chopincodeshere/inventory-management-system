const express = require("express");

const {
  getAllClients,
  getClient,
  getClientByQuery,
  addClient,
  updateClient,
  deleteClient,
} = require("../controllers/client_controller");

const router = express.Router();

router.route("/").get(getAllClients).post(addClient);
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);
router.route("/search").get(getClientByQuery);

module.exports = router;
