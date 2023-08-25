const express = require("express");
const app = express();
const products = require("./routes/products_routes");
const clients = require("./routes/clients_routes");
const connectDB = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB = process.env.DB_NAME;
const CONNECTION_URL = process.env.MONGO_URI;

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/v1/products", products);

app.use("/api/v1/clients", clients);

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
