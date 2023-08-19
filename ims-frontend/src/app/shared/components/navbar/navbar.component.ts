import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Add item',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/products/add-product'
      },
      {
        label: 'All items',
        icon: 'pi pi-list',
        routerLink: '/products/all-products'
      }
    ];
  }
  
}
