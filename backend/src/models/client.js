const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
  },
  mailingName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Must provide an email"],
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
  city: {
    type: String,
    required: [true, "Must provide a city"],
  },
  pincode: {
    type: String,
    required: [true, "Must provide a pincode"],
  },
  phoneNo: {
    type: String,
    required: [true, "Must provide a phone number"],
  },
  mobileNo: {
    type: String,
    required: [true, "Must provide a mobile number"],
  },
  gstNumber: {
    type: String,
    required: [true, "Must provide a GST number"],
  },
  accountNumber: {
    type: String,
    required: [true, "Must provide an account number"],
  },
  creditDetails: {
    type: {
      total: Number,
      items: [
        {
          productName: String,
          productId: String,
          quantity: Number,
          price: Number,
          gstDetails: String,
          discount: Number,
          description: String,
          hsnCode: String,
          taxCategory: {
            key: String,
            tax: String,
          },
          taxAmount: Number,
          images: String,
          date: Date
        },
      ],
    },
  },
  financialYearFrom: {
    type: Date,
    required: [true, "Must provide a date for the start of the financial year"],
  },
  booksBeginningFrom: {
    type: Date,
    required: [true, "Must provide a date for the start of financial records"],
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
  totalSales: {
    type: {
      grossSales: Number,
      netSales: Number,
    }
  }
});

module.exports = mongoose.model("Client", clientSchema);
