import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { BillingComponent } from './components/billing/billing.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent, CreateOrderComponent, CustomerInfoComponent, ProductInfoComponent, PaymentInfoComponent, BillingComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    StepsModule,
    DropdownModule,
    PanelMenuModule,
    TabMenuModule,
    TableModule,
    AutoCompleteModule,
    ButtonModule,
    CardModule,
  ],
})
export class OrdersModule {}