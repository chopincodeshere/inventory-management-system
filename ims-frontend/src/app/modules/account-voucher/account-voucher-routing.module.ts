import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVoucherComponent } from './components/create-voucher/create-voucher.component';

const routes: Routes = [
  {
    path: 'create-voucher',
    component: CreateVoucherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVoucherRoutingModule {}
