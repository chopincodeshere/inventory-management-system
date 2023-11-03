const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async (url, dbName) => {
  try {
    await mongoose
      .connect(`${url}/${dbName}`, options);
    return console.log("Connecton successful");
  } catch (error) {
    return console.log(error);
  }
};

module.exports = connectDB;
