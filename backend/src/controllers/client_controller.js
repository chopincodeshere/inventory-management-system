const Client = require("../models/client");

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getClientById = async (req, res) => {
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

const getClientByQuery = async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      const clients = await Client.find({});

      res.status(200).json(clients);
      return;
    }

    const keywordArray = keywords.split(",").map((keyword) => keyword.trim());

    // Create an array of regex patterns for each keyword
    const regexPatterns = keywordArray.map(
      (keyword) => new RegExp(keyword, "i")
    );

    const clients = await Client.find({
      $or: [
        { name: { $in: regexPatterns } },
        { mailingName: { $in: regexPatterns } },
        { address: { $in: regexPatterns } },
        { country: { $in: regexPatterns } },
        { state: { $in: regexPatterns } },
        { pincode: { $in: regexPatterns } },
        { phoneNo: { $in: regexPatterns } },
        { mobileNo: { $in: regexPatterns } },
      ],
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getClientsByName = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      // If no query provided, return all client names
      const clientNames = await Client.find({}, "name");
      return res.status(200).json(clientNames);
    }

    // Filter clients based on the query
    const matchingClients = await Client.find(
      { name: { $regex: query, $options: "i" } },
      "name"
    );
    const matchingNames = matchingClients.map((client) => client.name);

    res.status(200).json(matchingNames);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getClientByName = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      // If no query provided, return all client names
      const clientNames = await Client.find({}, "name");
      return res.status(200).json(clientNames);
    }

    // Find products with the exact name
    const matchingClient = await Client.findOne({ name: query });

    res.status(200).json(matchingClient);
  } catch (error) {
    res.status(500).json(error);
  }
};

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

const updateClient = async (req, res) => {
  try {
    const { id: clientId } = req.params;
    const client = await Client.findOneAndUpdate({ _id: clientId }, req.body, {
      new: true,
      runValidators: true,
      overWrite: true,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(201).json({ client, message: "Client Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const addCreditAmount = async (req, res) => {
  try {
    const { id: clientId } = req.params;

    const client = await Client.findOneAndUpdate(
      { _id: clientId },
      { creditDetails: req.body },
      {
        new: true,
      }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(201).json({ client, message: "Credit amount has been added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTotalSales = async (req, res) => {
  try {
    const { id: clientId } = req.params;

    const grossAmount = req.body.grossAmount;
    const netAmount = req.body.netAmount;

    const client = await Client.findOneAndUpdate(
      { _id: clientId },
      {
        $inc: {
          'totalSales.grossSales': grossAmount,
          'totalSales.netSales': netAmount,
        },
      },
      {
        new: true,
      }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(201).json({ client, message: "Total Sales has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteClient = async (req, res) => {
  try {
    const { id: clientId } = req.params;
    const client = await Client.findOneAndDelete({ _id: clientId });

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(200).json({ message: "Client has been removed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
