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
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { BillingComponent } from './components/billing/billing.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './state/order.reducer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { AllPurchaseOrdersComponent } from './components/all-purchase-orders/all-purchase-orders.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    CreateOrderComponent,
    CustomerInfoComponent,
    ProductInfoComponent,
    BillingComponent,
    CreatePurchaseOrderComponent,
    AllPurchaseOrdersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    StepsModule,
    RadioButtonModule,
    ConfirmPopupModule,
    InputNumberModule,
    DropdownModule,
    ProgressSpinnerModule,
    DividerModule,
    TableModule,
    ToastModule,
    PaginatorModule,
    PdfViewerModule,
    AutoCompleteModule,
    ImageModule,
    ButtonModule,
    VirtualScrollerModule,
    CardModule,
    StoreModule.forFeature('invoice', invoiceReducer),
  ],
  providers: [MessageService, ConfirmationService],
})
export class OrdersModule {}
