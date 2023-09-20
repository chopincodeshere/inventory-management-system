import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css'],
})
export class CreatePurchaseOrderComponent {
  purchaseOrderForm: FormGroup;
  itemsGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.itemsGroup = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemQuantity: [0, Validators.min(0)],
      itemUnitPrice: [0, Validators.min(0)],
    });

    this.purchaseOrderForm = this.formBuilder.group({
      purchaseOrderNumber: [''], // You can add validators here if needed
      date: [''],
      vendorName: ['', Validators.required],
      vendorAddress: [''],
      vendorContactInformation: this.formBuilder.group({
        email: [''],
        phone: [''],
      }),
      shippingInformation: this.formBuilder.group({
        shippingAddress: [''],
        shippingMethod: [''],
        expectedDeliveryDate: [''],
      }),
      billingInformation: this.formBuilder.group({
        billingAddress: [''],
        paymentTerms: [''],
        paymentMethod: [''],
      }),
      items: this.formBuilder.array([]),
      purchaseRequester: ['', Validators.required],
      termsAndConditions: [''],
      attachments: [''],
      approvalSignatures: this.formBuilder.array([]), // You'll need to handle the dynamic addition of signatures separately
      purchaseOrderStatus: [''],
      deliveryConfirmation: [''],
      notesOrComments: [''],
      purchaseOrderTotal: [''],
      taxAndShippingTotal: [''],
      grandTotal: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {}

  isControlInvalidAndDirty(controlName: string): boolean | undefined {
    const control = this.purchaseOrderForm.get(controlName);
    return control?.invalid && control?.dirty;
  }

  // Function to add a new item to the form array
  addItem() {
    let itemsArray = <FormArray> this.purchaseOrderForm.get('items')['controls'];
    itemsArray.push(this.itemsGroup.value);

    console.log(this.purchaseOrderForm.get('items')['controls']);
    
    this.itemsGroup.reset();
  }

  // Function to remove an item from the form array
  removeItem(index: number) {}

  handleAttachments(event: any) {}
}
