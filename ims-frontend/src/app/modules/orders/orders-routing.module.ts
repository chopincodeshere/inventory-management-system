import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { BillingComponent } from './components/billing/billing.component';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { AllPurchaseOrdersComponent } from './components/all-purchase-orders/all-purchase-orders.component';

const routes: Routes = [
  {
    path: 'sales/create-order',
    component: CreateOrderComponent,
    children: [
      { path: '', redirectTo: 'customer-info', pathMatch: 'full' },
      { path: 'customer-info', component: CustomerInfoComponent },
      { path: 'product-info', component: ProductInfoComponent },
      { path: 'billing-info', component: BillingComponent },
    ],
  },
  { path: 'sales/show-orders', component: OrdersComponent },
  { path: 'sales/order-details/:id', component: OrderDetailsComponent },
  { path: 'purchase/create-order', component: CreatePurchaseOrderComponent },
  { path: 'purchase/show-orders', component: AllPurchaseOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
