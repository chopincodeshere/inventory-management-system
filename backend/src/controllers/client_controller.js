const Client = require("../models/client");

const getAllClients = async (req, res) => {};

const getClient = async (req, res) => {};

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
