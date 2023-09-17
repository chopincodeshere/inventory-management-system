import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  constructor(
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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

  confirm(event: Event, orderId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteOrder(orderId);
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Record has been deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Deletion Cancelled',
          detail: 'Record has not been deleted',
        });
      },
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Record deleted',
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

  getOrders() {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response;
    });
  }

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  showOrder(id: number) {
    this.router.navigateByUrl(`/orders/order-details/${id}`);
  }

  editOrder(orderId: string) {
    this.router.navigateByUrl(`/orders/${orderId}/edit`);
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(
      (response) => {
        this.getOrders();
      },
      (error: HttpErrorResponse) => {
        this.showError(error.message);
      }
    );
  }
}
