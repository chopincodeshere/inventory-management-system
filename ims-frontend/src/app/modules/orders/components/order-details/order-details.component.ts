import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  order: Order;
  id: string;
  events: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrderById(this.id).subscribe(
      (response) => {
        this.order = response;

       
      },
      (error: HttpErrorResponse) => {
        this.showError('Error fetching order details:' + error.status);
      }
    );
  }

  navigateBack() {
    this.router.navigateByUrl(`/orders/sales/show-orders`)
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
}
