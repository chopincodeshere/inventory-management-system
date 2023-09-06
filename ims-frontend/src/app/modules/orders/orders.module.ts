import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { BillingComponent } from './components/billing/billing.component';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { customerInfoReducer } from './state/order.reducer';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    CreateOrderComponent,
    CustomerInfoComponent,
    ProductInfoComponent,
    BillingComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    StepsModule,
    RadioButtonModule,
    InputNumberModule,
    DropdownModule,
    DividerModule,
    TableModule,
    AutoCompleteModule,
    ImageModule,
    ButtonModule,
    CardModule,
    StoreModule.forFeature('customerInfo', customerInfoReducer),
  ],
  providers: [MessageService],
})
export class OrdersModule {}
