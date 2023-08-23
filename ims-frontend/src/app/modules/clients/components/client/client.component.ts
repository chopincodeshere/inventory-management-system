import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  _id: string;
  client: Client;
  isLoading: boolean = false;

  chart: any;

  years: Array<string> = ['2019', '2020', '2021', '2022', '2023'];

  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this._id = this.route.snapshot.paramMap.get('id')!;

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'Sales',
            data: [10, 25, 20, 25, 40],
            borderColor: 'blue',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Yearly sales',
          },
        },
      },
    });

    this.loadClient();
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  loadClient() {
    this.clientService.getClientById(this._id).subscribe(
      (response) => {
        this.client = response;
      },
      (error: HttpErrorResponse) => {
        this.showError(
          `Error fetching client with id: ${this._id} due to ${error.message}`
        );
      }
    );

    this.isLoading = false;
  }
}
