import { Component } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders!: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
      
    });
  }
}
