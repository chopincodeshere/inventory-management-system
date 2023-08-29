import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: '/',
          },
        ],
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Add item',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/products/add-product',
          },
          {
            label: 'All items',
            icon: 'pi pi-list',
            routerLink: '/products/all-products',
          },
        ],
      },
      {
        label: 'Clients/Companies',
        items: [
          {
            label: 'Add client/company',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/clients/add-client',
          },
          {
            label: 'All clients',
            icon: 'pi pi-users',
            routerLink: '/clients/all-clients',
          },
        ],
      },
      {
        label: 'Orders',
        items: [
          {
            label: 'Create order',
            icon: 'pi pi-cart-plus',
            routerLink: '/orders/create-order',
          },
          {
            label: 'All orders',
            icon: 'pi pi-shopping-cart',
            routerLink: '/orders/show-orders',
          },
          
        ],
      },
    ];
  }
}
