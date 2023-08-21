const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
  },
  mailingName: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Must provide an address"],
  },
  country: {
    type: String,
    required: [true, "Must provide a country"],
  },
  state: {
    type: String,
    required: [true, "Must provide a state"],
  },
  pincode: {
    type: String,
    require: [true, "Must provide a pincode"],
  },
  phoneNo: {
    type: String,
    require: [true, "Must provide a phone number"],
  },
  mobileNo: {
    type: String,
    require: [true, "Must provide a mobile number"],
  },
  financialYearFrom: {
    type: Date,
    require: [true, "Must provide a date for start of financial year"],
  },
  booksBeginFrom: {
    type: Date,
    require: [true, "Must provide a date for start of financial records"],
  },
  baseCurrencyInformation: {
    baseCurrencySymbol: {
      type: String,
      required: [true, "Must provide a base currency symbol"],
    },
    formalName: {
      type: String,
      required: [true, "Must provide a formal name for the base currency"],
    },
    decimalPlaces: {
      type: Number,
      required: [true, "Must provide the number of decimal places"],
    },
    symbolForDecimal: {
      type: String,
      required: [true, "Must provide a symbol for decimals"],
    },
    symbolForThousands: {
      type: String,
      required: [true, "Must provide a symbol for thousands"],
    },
  },
});

module.exports = mongoose.model("Client", clientSchema);
