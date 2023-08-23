const Client = require("../models/client");

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getClientByQuery = async (req, res) => {};

const addClient = async (req, res) => {
  const clientData = req.body;
  try {
    const newClient = await Client.create(clientData);
    return res
      .status(201)
      .json({ newClient, message: "Client added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateClient = async (req, res) => {};

const deleteClient = async (req, res) => {};

module.exports = {
  getAllClients,
  getClient,
  getClientByQuery,
  addClient,
  updateClient,
  deleteClient,
};
