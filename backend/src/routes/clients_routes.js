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
router.get("/search", getClientByQuery);
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);

module.exports = router;
