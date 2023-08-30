import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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

  getProductDetails(selectedItem: string) {
    this.productService.fetchProductDetailsByName(selectedItem).subscribe(
      (response) => {
        this.productInfo.patchValue({
          productId: response.productCode,
          price: response.price,
          hsnCode: response.hsnCode,
          description: response.description,
        });
        console.log(this.productInfo.value);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    // Check if the form is valid
    if (this.productInfo.valid) {
      // Create a copy of the form value
      const product = { ...this.productInfo.value };

      // Push the product into the orderList
      this.orderList.push(product);

      // Reset the form
      this.productInfo.reset();

      // Increment the activeIndex in localStorage
      localStorage.setItem(
        'activeIndex',
        JSON.stringify(Number(localStorage.getItem('activeIndex')) + 1)
      );

      // Navigate to the next page
      this.router.navigateByUrl('/orders/create-order/product-info');
    } else {
      // If the form is not valid, mark all fields as touched
      this.productInfo.markAllAsTouched();
    }
  }
}
