const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = (url, dbName) => {
  return mongoose.connect(`${url}/${dbName}`, options);
};

module.exports = connectDB;
