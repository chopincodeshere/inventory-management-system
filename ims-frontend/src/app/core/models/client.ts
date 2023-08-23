export interface Client {
  name: string;
  mailingName: string;
  address: string;
  country: string;
  state: string;
  pincode: string;
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
  totalSales: number
}
