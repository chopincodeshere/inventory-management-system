import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AllClientsComponent } from './components/all-clients/all-clients.component';
import { ClientComponent } from './components/client/client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

const routes: Routes = [
  {
    path: 'add-client',
    component: AddClientComponent,
  },
  {
    path: 'all-clients',
    component: AllClientsComponent,
  },
  {
    path: 'all-clients/:id',
    component: ClientComponent,
  },
  {
    path: 'all-clients/:id/edit',
    component: EditClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
