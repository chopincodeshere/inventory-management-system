import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AllClientsComponent } from './components/all-clients/all-clients.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AddClientComponent, AllClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule
  ],
})
export class ClientsModule {}
