import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders!: Order[];

  searchQuery: string = '';

  private searchTerms = new Subject<string>();

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.orderService.searchOrder(term))
      )
      .subscribe((results) => {
        this.orders = results;
      });
  }

  getOrders() {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response;
    });
  }

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  showOrder(id: number) {}

  editOrder(order: Order) {}

  deleteOrder(id: number) {}
}
