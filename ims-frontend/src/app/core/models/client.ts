export interface Client {
  _id: string;
  name: string;
  mailingName: string;
  email: string;
  address: string;
  country: string;
  state: string;
  pincode: string;
  accountNumber: string;
  gstNumber: string;
  phoneNo: string;
  mobileNo: string;
  financialYearFrom: string;
  booksBeginningFrom: string;
  tallyVaultPassword: string;
  baseCurrencyInformation: {
    baseCurrencySymbol: string;
    formalName: string;
    decimalPlaces: number;
    symbolForDecimal: string;
    symbolForThousands: string;
  };
  totalSales: number,
  amountCredited: number;
}
