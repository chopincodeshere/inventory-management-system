import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountVoucherRoutingModule } from './account-voucher-routing.module';
import { CreateVoucherComponent } from './components/create-voucher/create-voucher.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CreateVoucherComponent
  ],
  imports: [
    CommonModule,
    AccountVoucherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RippleModule,
    CardModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    FileUploadModule,
    ConfirmPopupModule,
    InputNumberModule
  ]
})
export class AccountVoucherModule { }
