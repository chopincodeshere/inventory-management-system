import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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

  clonedClients: { [s: string]: Client } = {};

  searchQuery: string = '';

  private searchTerms = new Subject<string>();

  constructor(
    private messageService: MessageService,
    private clientService: ClientService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadClients();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.clientService.searchClient(term))
      )
      .subscribe((results) => {
        this.clients = results;
      });
  }

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
    this.router.navigateByUrl(`/clients/all-clients/${id}`);
  }

  editClient(client: Client) {
    this.router.navigateByUrl(`/clients/all-clients/${client._id}/edit`);
  }

  deleteRecord() {
    try {
      this.selectedClients.forEach((element) => {
        this.clientService.deleteClient(element._id).subscribe(
          (response) => {
            this.loadClients();
          },
          (error: HttpErrorResponse) => {
            this.showError(error.status + '' + error.message);
          }
        );
      });
    } catch (error) {
      throw error;
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteRecord();
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'The item was deleted successfully',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'No items were deleted',
        });
      },
    });
  }
}
