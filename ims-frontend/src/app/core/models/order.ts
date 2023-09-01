export interface Order {
  _id: string;
  customerName: string;
  date: Date;
  status: string;
  items: ProductOrder[];
  shippingAddress: string;
  billingAddress: string;
  paymentDetails: {
    credit: boolean;
    cardNumber: string;
    cardType: string;
    expirationDate: Date;
  };
}

export interface ProductOrder {
  productId: string;
  quantity: number;
  price: number;
}
