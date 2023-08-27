export interface Order {
  orderNumber: string;
  orderDate: Date;
  customerInfo: {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
  products: ProductOrder[];
  orderStatus: string;
  shippingInfo: {
    address: string;
    method: string;
    trackingNumber: string;
  };
  paymentInfo: {
    method: string;
  };
}

export interface ProductOrder {
  productID: string;
  productName: string;
  quantity: number;
  price: number;
}
