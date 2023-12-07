import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/core/models/product';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = []; // Initialize with your actual product data
  rows: number | undefined; // Number of rows per page
  selectedProducts: Product[] = [];
  isLoading: boolean = true;

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

  clonedProducts: { [s: string]: Product } = {};

  searchQuery: string = '';

  private searchTerms = new Subject<string>();

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.productService.searchProducts(term))
      )
      .subscribe((results) => {
        this.products = results;
      });
  }

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteRecord();
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'No items were deleted',
        });
      },
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

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.rows = data.length;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.showError(error.message);
      }
    );
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product._id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
    this.productService.updateProduct(product._id, product).subscribe(
      (response) => {
        this.showSuccess('Product has been updated successfully.');
        this.loadProducts();
      },
      (error: HttpErrorResponse) => {
        this.showError(error.status + ' ' + error.message);
      }
    );
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product._id as string];
    delete this.clonedProducts[product._id as string];
  }

  deleteRecord() {
    try {
      this.selectedProducts.forEach((element) => {
        this.productService.deleteProduct(element._id).subscribe(
          (response) => {
            this.loadProducts();
          },
          (error: HttpErrorResponse) => {
            this.showError(error.status + '' + error.message);
          }
        );
        this.showSuccess('Item has been deleted successfully.');
      });
    } catch (error) {
      throw error;
    }
  }
}
