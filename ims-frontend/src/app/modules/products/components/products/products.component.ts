import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  clonedProducts: { [s: string]: Product } = {};

  searchQuery: string = '';

  private searchTerms = new Subject<string>();

  constructor(
    private productService: ProductService,
    private messageService: MessageService
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
