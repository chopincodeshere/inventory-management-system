import { Product } from './product';

export interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerContact: string;
  date: Date;
  status: string;
  items: Product[];
  shippingAddress: string;
  billingAddress: string;
  paymentDetails: {
    credit: boolean;
    amount: number;
    discount?: number
  };
}
