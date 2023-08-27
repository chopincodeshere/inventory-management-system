import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AllClientsComponent } from './components/all-clients/all-clients.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientService } from 'src/app/services/client-service/client.service';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ClientComponent } from './components/client/client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

@NgModule({
  declarations: [AddClientComponent, AllClientsComponent, ClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    ConfirmPopupModule,
    InputTextModule,
    ToastModule,
    ProgressBarModule,
    CardModule,
    ButtonModule,
  ],
  providers: [MessageService, ConfirmationService, ClientService],
})
export class ClientsModule {}
