const express = require("express");
const app = express();
const products = require("./routes/products");
const connectDB = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB = process.env.DB_NAME

// Middleware for parsing JSON and urlencoded form data.
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/v1/products", products);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI, DB);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
