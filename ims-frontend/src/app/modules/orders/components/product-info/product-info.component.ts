import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent {
  productInfo: FormGroup;
  productSuggestions: string[] | undefined;
  total: number = 0;

  orderList: any = [];

  goods_categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Books' },
    { id: 5, name: 'Food' },
    { id: 6, name: 'Toys' },
    { id: 7, name: 'Sports Equipment' },
  ];

  private searchTerms = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.productInfo = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productId: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      hsnCode: ['', Validators.required],
      gstDetails: this.formBuilder.group({
        cgst: ['', Validators.required],
        sgst: ['', Validators.required],
        igst: [''],
      }),
      images: [''],
    });
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          term.length >= 1
            ? this.productService.fetchProductSuggestions(term)
            : []
        )
      )
      .subscribe((results) => {
        this.productSuggestions = results;
      });
  }

  search(event: any): void {
    const query = event.query;
    this.searchTerms.next(query);
  }

  navigateBack() {
    this.router.navigate(['/orders/create-order/customer-info']);

    localStorage.setItem(
      'activeIndex',
      JSON.stringify(Number(localStorage.getItem('activeIndex')) - 1)
    );
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

  getProductDetails(selectedItem: string) {
    this.productService.fetchProductDetailsByName(selectedItem).subscribe(
      (response) => {
        this.productInfo.patchValue({
          productId: response.productCode,
          price: response.price,
          hsnCode: response.hsnCode,
          description: response.description,
        });
      },
      (error: HttpErrorResponse) => {
        this.showError(error.status + ' ' + error.message);
      }
    );
  }

  getPrice(quantity: number, price: number): number {
    return quantity * price;
  }

  getTotal(): number {
    let total = 0;
  
    for (const order of this.orderList) {
      const itemTotal = this.getPrice(order.quantity, order.price);
      total += itemTotal;
    }
  
    return total;
  }
  

  checkQuantity(): boolean {
    let result = this.productInfo.value.quantity > 0 ? false : true;

    return result;
  }

  addItem() {
    const product = { ...this.productInfo.value };
    this.showSuccess('Product added to the checkout list.');
    this.orderList.push(product);
    this.productInfo.reset();
  }

  proceedToCheckout() {
    // Increment the activeIndex in localStorage
    localStorage.setItem(
      'activeIndex',
      JSON.stringify(Number(localStorage.getItem('activeIndex')) + 1)
    );

    this.router.navigateByUrl('/orders/create-order/billing-info');
  }
}
