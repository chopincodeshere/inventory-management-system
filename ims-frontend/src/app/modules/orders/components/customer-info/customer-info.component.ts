import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent {
  customerInfo: FormGroup;

  customers: Client[] | undefined;

  customerNameSuggestions: string[] | undefined;

  private searchTerms = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.customerInfo = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerAccountNumber: ['', Validators.required],
      customerGST: ['', Validators.required],
      notes: '',
    });
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          term.length >= 1
            ? this.clientService.fetchCustomerNameSuggestions(term)
            : []
        )
      )
      .subscribe((results) => {
        this.customerNameSuggestions = results;
      });
  }

  search(event: any): void {
    const query = event.query;
    this.searchTerms.next(query);
  }

  getClientDetails(selectedItem: any) {
    this.clientService.getClientByName(selectedItem.value).subscribe((response) => {      
      this.customerInfo.patchValue({
        customerEmail: response.email,
        customerPhone: response.phoneNo,
        customerAddress: response.address,
        customerAccountNumber: response.accountNumber,
        customerGST: response.gstNumber,
      });

      this.changeDetectorRef.detectChanges();
    });
  }

  onSubmit() {
    localStorage.setItem(
      'activeIndex',
      JSON.stringify(Number(localStorage.getItem('activeIndex')) + 1)
    );

    localStorage.setItem('clientInfo', JSON.stringify(this.customerInfo.value))

    this.router.navigateByUrl('/orders/sales/create-order/product-info');
  }
}
