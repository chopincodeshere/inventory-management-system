import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor(private router: Router) {}

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

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        switch (event.url) {
          case '/orders/sales/create-order/customer-info':
            this.activeIndex = 0;
            break;

          case '/orders/sales/create-order/product-info':
            this.activeIndex = 1;
            break;

          case '/orders/sales/create-order/billing-info':
            this.activeIndex = 2;
            break;

          default:
            this.activeIndex = 0;
            break;
        }

        localStorage.setItem('activeIndex', this.activeIndex.toString());
      });
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event
    localStorage.setItem('activeIndex', this.activeIndex.toString());
  }
}
