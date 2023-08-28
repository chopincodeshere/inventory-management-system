import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.formBuilder.group({});
  }

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
        label: 'Payment',
        routerLink: 'payment-info',
      },
      {
        label: 'Billing',
        routerLink: 'billing',
      },
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
}

  onSubmit() {}
}
