const express = require("express");
const cors = require("cors");

const app = express();

const products = require("./routes/products_routes");
const clients = require("./routes/clients_routes");
const orders = require("./routes/orders_routes");
const connectDB = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB = process.env.DB_NAME;
const CONNECTION_URL = process.env.MONGO_URI;
// const CONNECTION_URL = 'mongodb://127.0.0.1:27017';

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());

app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/v1/products", products);

app.use("/api/v1/clients", clients);

app.use("/api/v1/orders", orders);

const startServer = async () => {
  try {
    await connectDB(CONNECTION_URL, DB);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
