export interface PurchaseOrder {
    purchaseOrderNumber: string;
    date: string;
    vendorName: string;
    vendorAddress: string;
    vendorContactInformation: {
      email: string;
      phone: string;
    };
    shippingInformation: {
      shippingAddress: string;
      shippingMethod: string;
      expectedDeliveryDate: string;
    };
    billingInformation: {
      billingAddress: string;
      paymentTerms: string;
      paymentMethod: string;
    };
    items: any[]; // You may want to define an interface for items as well
    purchaseRequester: string;
    termsAndConditions: string;
    attachments: string;
    approvalSignatures: any[]; // You may want to define an interface for signatures as well
    purchaseOrderStatus: string;
    deliveryConfirmation: string;
    notesOrComments: string;
    purchaseOrderTotal: string;
    taxAndShippingTotal: string;
    grandTotal: string;
  }