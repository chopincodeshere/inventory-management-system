export interface Client {
  _id: string;
  name: string;
  mailingName?: string;
  email: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  accountNumber: string;
  gstNumber: string;
  phoneNo: string;
  mobileNo: string;
  creditDetails: {
    total: number;
    items: Array<{
      productName: string;
      productId: string;
      quantity: number;
      price: number;
      gstDetails: string;
      discount: number;
      description: string;
      hsnCode: string;
      taxCategory: {
        key: string;
        tax: string;
      };
      taxAmount: number;
      images: string;
      date: string; // Changed to string type
    }>;
  };
  financialYearFrom: string; // Changed to string type
  booksBeginningFrom: string; // Changed to string type
  baseCurrencyInformation: {
    baseCurrencySymbol: string;
    formalName: string;
    decimalPlaces: number;
    symbolForDecimal: string;
    symbolForThousands: string;
  };
  totalSales: {
    grossSales: number;
    netSales: number;
  };
  amountCredited: number;
}
