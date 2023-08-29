export interface Product {
    _id: string;
    name: string;
    productCode: string;
    productType: string;
    uom: string;
    taxCategory: string;
    hsnCode: string;
    price: number;
    quantity: number;
    description: string;
    image?: File; // You may want to use a different type depending on your implementation
    attributes: string;
    batchNumber: string;
    barcode?: string;
    manufacturer: string;
    stockFlag: string;
  }
   