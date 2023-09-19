import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css'],
})
export class CreatePurchaseOrderComponent {
  purchaseOrderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createItemFormGroup();

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
      purchaseRequester: ['', Validators.required],
      items: this.formBuilder.array([]), // You'll need to handle the dynamic addition of items separately
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

  ngOnInit() {
  }

  onSubmit() {}

  isControlInvalidAndDirty(controlName: string): boolean | undefined {
    const control = this.purchaseOrderForm.get(controlName);
    return control?.invalid && control?.dirty;
  }

  // Function to add a new item to the form array
  addItem() {
    const items = this.purchaseOrderForm.get('items') as FormArray;
    items.push(this.createItemFormGroup());
  }

  // Function to remove an item from the form array
  removeItem(index: number) {
    const items = this.purchaseOrderForm.get('items') as FormArray;
    items.removeAt(index);
  }

  createItemFormGroup() {
    return this.formBuilder.group({
      itemName: ['', Validators.required],
      itemDescription: [''],
      itemQuantity: [0, Validators.min(0)],
      itemUnitPrice: [0, Validators.min(0)],
    });
  }

  handleAttachments(event: any) {}
}
