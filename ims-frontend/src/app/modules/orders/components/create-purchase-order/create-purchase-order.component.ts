import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { v4 as uuidv4 } from 'uuid';

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
      id: ['', Validators.required],
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
    let itemsArray = <FormArray>this.purchaseOrderForm.get('items')['controls'];

    this.itemsGroup.patchValue({ id: uuidv4() });

    itemsArray.push(this.itemsGroup.value);

    this.itemsGroup.reset();
  }

  // Function to remove an item from the form array
  removeItem(uuid: string) {
    const itemsArray = this.purchaseOrderForm.get('items') as FormArray;

    // Use the filter method to exclude the item with the specified UUID
    const filteredItems = itemsArray.value.filter(
      (item: any) => item.id !== uuid
    );

    // Update the FormArray with the filtered items
    itemsArray.clear(); // Clear the FormArray
    filteredItems.forEach((item: any) => {
      itemsArray.push(this.formBuilder.group(item)); // Re-add the filtered items
    });
  }

  handleAttachments(event: any) {}
}
