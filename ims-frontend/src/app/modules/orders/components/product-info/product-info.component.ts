import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ClientService } from 'src/app/services/client-service/client.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ProductService } from 'src/app/services/product-service/product.service';

declare var Razorpay: any;

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent {
  productInfo: FormGroup;
  orderForm: FormGroup;
  productSuggestions: string[] | undefined;
  total: number = 0;
  filteredTaxes: any[] = [];
  isGst: boolean = false;
  taxCategory: string;
  taxValuesArray: any;

  customerInfoData: any;

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

  private searchTerms = new Subject<string>();
  

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private clientService: ClientService,
    private router: Router,
    private store: Store<{customerInfo: any}>,
    private messageService: MessageService
  ) {
    this.productInfo = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productId: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      gstDetails: ['', Validators.required],
      discount: [''],
      description: [''],
      hsnCode: ['', Validators.required],
      taxCategory: ['', Validators.required],
      taxAmount: ['', Validators.required],
      images: [''],
    });

    this.orderForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerContact: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      items: this.formBuilder.array([]), // You may need to handle items separately
      shippingAddress: ['', Validators.required],
      billingAddress: ['', Validators.required],
      paymentDetails: this.formBuilder.group({
        credit: [false],
        amount: [],
      }),
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

      this.store.pipe(select('customerInfo')).subscribe((data) => {
        this.customerInfoData = data;
        console.log(this.customerInfoData.customerInfo);
        
        // You can access the customerInfo data as this.customerInfoData.customerInfo
      });
  }

  isGSTIncluded() {
    const taxDetailsValue = this.productInfo.get('taxCategory').value;

    switch (taxDetailsValue.key) {
      case 'sgst_5':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 5,
          gstDetails: 'SGST',
        });
        break;

      case 'sgst_12':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 12,
          gstDetails: 'SGST',
        });
        break;

      case 'sgst_18':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 18,
          gstDetails: 'SGST',
        });
        break;

      case 'sgst_28':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 28,
          gstDetails: 'SGST',
        });
        break;

      case 'igst_5':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 5,
          gstDetails: 'IGST',
        });
        break;

      case 'igst_12':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 12,
          gstDetails: 'IGST',
        });
        break;

      case 'igst_18':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 18,
          gstDetails: 'IGST',
        });
        break;

      case 'igst_28':
        this.isGst = true;
        this.productInfo.patchValue({
          taxAmount: 28,
          gstDetails: 'IGST',
        });
        break;

      default:
        this.isGst = false;
        break;
    }
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

  filterTaxes(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTaxes = this.tax_options.filter(
      (tax) => tax.tax.toLowerCase().indexOf(query) !== -1
    );
  }

  isControlInvalidAndDirty(controlName: string): boolean | undefined {
    const control = this.productInfo.get(controlName);
    return control?.invalid && control?.dirty;
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
        let tax_option: { key: string; tax: string };
        for (let i in this.tax_options) {
          if (this.tax_options[i].tax === response.taxCategory) {
            tax_option = {
              key: this.tax_options[i].key,
              tax: this.tax_options[i].tax,
            };
            break;
          }
        }

        this.productInfo.patchValue({
          productId: response.productCode,
          price: response.price,
          hsnCode: response.hsnCode,
          taxCategory: tax_option,
          description: response.description,
        });

        this.isGSTIncluded();
      },
      (error: HttpErrorResponse) => {
        this.showError(error.status + ' ' + error.message);
      }
    );
  }

  getPrice(quantity: number, price: number): number {
    return quantity * price;
  }

  groupProductsByTaxCategory(): any {
    let groupedProducts = {};

    for (const order of this.orderList) {
      const { taxCategory, taxAmount } = order;

      if (!groupedProducts[taxCategory.key]) {
        groupedProducts[taxCategory.key] = [];
      }

      groupedProducts[taxCategory.key].push({ ...order, taxAmount });
    }

    return groupedProducts;
  }

  getTotal(): number {
    let total = 0;

    for (const order of this.orderList) {
      const itemTotal = this.getPrice(order.quantity, order.price);
      total += itemTotal;
    }

    this.orderForm.patchValue({
      paymentDetails: {
        amount: total,
      },
    });

    return total;
  }

  getCGST() {
    let groupedProducts = this.groupProductsByTaxCategory();
    const taxTotals = {};

    for (const category in groupedProducts) {
      const productsInCategory = groupedProducts[category];
      const totalTaxAmount = productsInCategory.reduce(
        (total: number, product: { price: number; taxAmount: number }) =>
          total + product.taxAmount / 2,
        0
      );

      const averageTaxAmount = totalTaxAmount / productsInCategory.length;

      taxTotals[category] = averageTaxAmount;
    }

    this.taxValuesArray = Object.keys(taxTotals).map((key) => ({
      key,
      value: taxTotals[key],
    }));

    return taxTotals;
  }

  getSGST() {
    let groupedProducts = this.groupProductsByTaxCategory();
    const taxTotals = {};

    for (const category in groupedProducts) {
      const productsInCategory = groupedProducts[category];
      const totalTaxAmount = productsInCategory.reduce(
        (total: number, product: { price: number; taxAmount: number }) =>
          total + product.taxAmount / 2,
        0
      );

      const averageTaxAmount = totalTaxAmount / productsInCategory.length;

      taxTotals[category] = averageTaxAmount;
    }

    return taxTotals;
  }

  getGrandTotal(): any {
    let grandTotal =
      (this.getCGST()[this.taxCategory] * this.getTotal()) / 100 +
      (this.getSGST()[this.taxCategory] * this.getTotal()) / 100 +
      this.getTotal() -
      (this.getTotal() * this.productInfo.value.discount) / 100;
    return grandTotal;
  }

  checkQuantity(): boolean {
    let result = !this.productInfo.valid;

    return result;
  }

  addItem() {
    const product = { ...this.productInfo.value };
    this.showSuccess('Product added to the checkout list');
    this.orderList.push(product);

    // Get a reference to the "items" FormArray
    const itemsFormArray = this.orderForm.get('items') as FormArray;

    // Add the product to the FormArray
    itemsFormArray.push(this.formBuilder.group(product));

    this.taxCategory = this.productInfo.value.taxCategory.key;

    // Clear the productInfo form control
    this.productInfo.reset();
  }

  addCredit() {
    let client_id: string;
    let clientName: string = JSON.parse(
      localStorage.getItem('clientInfo')
    ).customerName;

    let credit: any = {
      amount: this.getTotal(),
      items: this.orderList,
    };

    this.orderForm.patchValue({
      paymentDetails: this.formBuilder.group({
        credit: [true],
      }),
    });

    // Set client credit
    this.clientService.getClientByName(clientName).subscribe((response) => {
      client_id = response._id;

      this.clientService.addCreditAmount(client_id, credit).subscribe(
        (response) => {
          this.showSuccess('Credit amount has been added.');
        },
        (error: HttpErrorResponse) => {
          this.showError(error.status + 'Failed to add credit amount');
        }
      );
    });

    this.orderService.createOrder(credit.amount, this.orderForm.value)

    localStorage.setItem(
      'activeIndex',
      JSON.stringify(Number(localStorage.getItem('activeIndex')) + 1)
    );

    this.router.navigateByUrl('/orders/create-order/billing-info');
  }

  proceedToCheckout() {
    let key: string;
  
    this.orderService.getRazorApiKey().subscribe((response) => {
      key = response.key;
    });
  
    this.orderForm.patchValue({
      customerName: this.customerInfoData.customerInfo.customerName,
      customerEmail: this.customerInfoData.customerInfo.customerEmail,
      customerContact: this.customerInfoData.customerInfo.customerPhone,
      shippingAddress: this.customerInfoData.customerInfo.address,
      billingAddress: this.customerInfoData.customerInfo.address,
      date: new Date(),
      status: 'Pending', // Will be handled in order tracking
    });
  
    let total = this.getTotal();
  
    this.orderService.createOrder(total, this.orderForm.value).subscribe(
      (response) => {
        var options = {
          // ... (Rest of your options)
        };
  
        var rzp1 = new Razorpay(options);
  
        rzp1.open();
      },
      (error: HttpErrorResponse) => {
        this.showError('Order has not been placed');
      }
    );
  }
  
}
