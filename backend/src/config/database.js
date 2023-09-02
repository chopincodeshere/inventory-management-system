const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = (url, dbName) => {
  return mongoose
    .connect(`${url}/${dbName}`, options)
    .then(() => console.log("Connecton successful"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
