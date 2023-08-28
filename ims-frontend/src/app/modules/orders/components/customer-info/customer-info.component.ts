import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';
import { OrderService } from 'src/app/services/order-service/order.service';

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

  selectedCustomer = new FormControl();

  customerNameSuggestions: string[] | undefined;

  private searchTerms = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private clientService: ClientService
  ) {
    this.customerInfo = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerPhone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerAccountNumber: ['', Validators.required],
      customerGST: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(300), // Adjust the debounce time (e.g., 500ms)
        distinctUntilChanged(),
        switchMap((term: string) =>
          term.length >= 3
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
}
