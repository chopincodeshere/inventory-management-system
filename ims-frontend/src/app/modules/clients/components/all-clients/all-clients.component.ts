import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css'],
})
export class AllClientsComponent {
  isLoading: boolean = false;

  clients: Client[] = []; // Initialize with your actual product data
  rows: number | undefined; // Number of rows per page
  selectedClients: Client[] = [];

  constructor(
    private messageService: MessageService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  clonedProducts: { [s: string]: Client } = {};

  searchQuery: string = '';

  private searchTerms = new Subject<string>();

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  loadClients() {
    this.isLoading = true;
    this.clientService.getClients().subscribe(
      (response) => {
        this.clients = response;
        this.rows = response.length;

        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.showError('Error fetching data');
      }
    );
  }

  showClient(id: number) {
    this.router.navigateByUrl(`/clients/all-clients/${id}`)
  }

  deleteRecord() {
    // try {
    //   this.selectedClients.forEach((element) => {
    //     this.productService.deleteProduct(element._id).subscribe(
    //       (response) => {
    //         this.loadProducts();
    //       },
    //       (error: HttpErrorResponse) => {
    //         this.showError(error.status + '' + error.message);
    //       }
    //     );
    //     this.showSuccess('Item has been deleted successfully.');
    //   });
    // } catch (error) {
    //   throw error;
    // }
  }
}
