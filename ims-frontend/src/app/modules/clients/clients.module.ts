import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AllClientsComponent } from './components/all-clients/all-clients.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ClientService } from 'src/app/services/client-service/client.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AddClientComponent, AllClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    CardModule,
    ButtonModule,
  ],
  providers: [MessageService, ClientService],
})
export class ClientsModule {}
