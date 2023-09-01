import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Customer Information',
        routerLink: 'customer-info',
      },
      {
        label: 'Product Information',
        routerLink: 'product-info',
      },
      {
        label: 'Billing',
        routerLink: 'billing-info',
      },
    ];

    this.activeIndex = Number(localStorage.getItem('activeIndex'));
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;

    localStorage.setItem('activeIndex', this.activeIndex.toString());
  }

  onSubmit() {}
}
