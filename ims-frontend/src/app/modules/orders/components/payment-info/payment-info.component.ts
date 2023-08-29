import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css'],
})
export class PaymentInfoComponent {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  constructor() {}
  ngOnInit() {
    this.items = [
      { label: 'Cards', icon: 'pi pi-fw pi-credit-card' },
      { label: 'Wallet', icon: 'pi pi-fw pi-wallet' },
      { label: 'Cash', icon: 'pi pi-fw pi-money-bill' },
      { label: 'Credit amount', icon: 'pi pi-fw pi-dollar' },
      { label: 'UPI', icon: 'pi pi-fw pi-qrcode' }
  ];

  this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
