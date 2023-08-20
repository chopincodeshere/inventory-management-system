import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AllClientsComponent } from './components/all-clients/all-clients.component';

const routes: Routes = [
  {
    path: 'add-client',
    component: AddClientComponent,
  },
  {
    path: 'all-clients',
    component: AllClientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
