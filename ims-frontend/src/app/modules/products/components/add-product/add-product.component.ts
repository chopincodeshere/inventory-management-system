import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product-service/product.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;

  filteredTaxes: any[] = [];

  tax_options = [
    { key: 'vat_standard', tax: 'Value Added Tax (VAT) - Standard Rate' },
    { key: 'vat_reduced', tax: 'Value Added Tax (VAT) - Reduced Rate' },
    { key: 'vat_exempt', tax: 'Value Added Tax (VAT) - Exempt' },
    { key: 'cst_standard', tax: 'Central Sales Tax (CST) - Standard Rate' },
    { key: 'cst_reduced', tax: 'Central Sales Tax (CST) - Reduced Rate' },
    { key: 'cst_exempt', tax: 'Central Sales Tax (CST) - Exempt' },
    { key: 'sgst_5', tax: 'Goods and Services Tax - State (SGST) - 5%' },
    { key: 'sgst_12', tax: 'Goods and Services Tax - State (SGST) - 12%' },
    { key: 'sgst_18', tax: 'Goods and Services Tax - State (SGST) - 18%' },
    { key: 'sgst_28', tax: 'Goods and Services Tax - State (SGST) - 28%' },
    { key: 'igst_5', tax: 'Goods and Services Tax - Integrated (IGST) - 5%' },
    { key: 'igst_12', tax: 'Goods and Services Tax - Integrated (IGST) - 12%' },
    { key: 'igst_18', tax: 'Goods and Services Tax - Integrated (IGST) - 18%' },
    { key: 'igst_28', tax: 'Goods and Services Tax - Integrated (IGST) - 28%' },
    { key: 'service_standard', tax: 'Service Tax - Standard Rate' },
    { key: 'service_reduced', tax: 'Service Tax - Reduced Rate' },
    { key: 'service_exempt', tax: 'Service Tax - Exempt' },
    { key: 'excise_basic', tax: 'Excise Duty - Basic Rate' },
    { key: 'excise_special', tax: 'Excise Duty - Special Rate' },
    { key: 'customs_basic', tax: 'Customs Duty - Basic Rate' },
    { key: 'customs_special', tax: 'Customs Duty - Special Rate' },
    { key: 'local_municipal', tax: 'Local Municipal Tax' },
    { key: 'composite_standard', tax: 'Composite Tax - Standard Rate' },
    { key: 'composite_reduced', tax: 'Composite Tax - Reduced Rate' },
    { key: 'zero_rated', tax: 'Zero Rated' },
    { key: 'exempt', tax: 'Exempt' },
  ];

  uom_options = [
    { key: 'Pcs', uom: 'Pieces' },
    { key: 'Kgs', uom: 'Kilograms' },
    { key: 'gs', uom: 'Grams' },
    { key: 'Mtrs', uom: 'Meters' },
    { key: 'Ctn', uom: 'Cartons' },
    { key: 'Lbs', uom: 'Pounds' },
    { key: 'Gal', uom: 'Gallons' },
    { key: 'SqFt', uom: 'Square Feet' },
    { key: 'Doz', uom: 'Dozens' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      productCode: ['', Validators.required],
      productType: ['', Validators.required],
      uom: ['', Validators.required],
      taxCategory: ['', Validators.required],
      hsnCode: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      description: [''],
      image: [''],
      attributes: [''],
      batchNumber: [''],
      manufacturer: ['', Validators.required],
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  onUpload(event: any) {
    const uploadedFile = event.files[0]; // Get the first uploaded file (assuming single file upload)
    this.productForm.patchValue({
      image: uploadedFile, // Set the uploaded file data or file name/path here
    });
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  filterTaxes(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTaxes = this.tax_options.filter(
      (tax) => tax.tax.toLowerCase().indexOf(query) !== -1
    );
  }

  isControlInvalidAndDirty(controlName: string): boolean | undefined {
    const control = this.productForm.get(controlName);
    return control?.invalid && control?.dirty;
  }

  onSubmit() {
    if (this.productForm.valid) {
      
      if(this.productForm.value.quantity < 10) {
        this.productForm.patchValue({
          stockFlag: "Low stock"
        })
      } else if(this.productForm.value.quantity === 0) {
        this.productForm.patchValue({
          stockFlag: "Out of stock"
        })
      }
      this.productService.addProduct(this.productForm!.value).subscribe(
        (res) => {
          this.showSuccess('Item added successfully!');
        },
        (error: HttpErrorResponse) => {
          this.showError(error.message);
        }
      );

      this.productForm.reset();
    } else {
      // Mark all form controls as touched to show validation errors
      Object.keys(this.productForm.controls).forEach((controlName) => {
        this.productForm.get(controlName)?.markAsTouched();
      });

      this.showError('Invalid fields');
    }
  }
}
