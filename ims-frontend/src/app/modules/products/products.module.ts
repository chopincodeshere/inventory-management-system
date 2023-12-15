import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product-service/product.service';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
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
  ],
  providers: [ProductService, MessageService, ConfirmationService]
})
export class ProductsModule { }
