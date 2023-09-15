import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { EmailService } from 'src/app/services/email-service/email.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  invoice: any;
  isGenerating: boolean = false;
  isError: boolean = false;
  pdfSrc: string;
  reciepientEmail: string;

  constructor(
    private store: Store<{ invoice: string }>,
    private mailService: EmailService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.store.pipe(select('invoice')).subscribe((data) => {
      this.invoice = data;

      const byteCharacters = atob(this.invoice.invoice);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      this.pdfSrc = link.href;
    });

    this.reciepientEmail = JSON.parse(
      localStorage.getItem('clientInfo')
    ).customerEmail;
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

  downloadPdfFromBase64(base64String: string, fileName: string): void {
    // Create a Blob object from the Base64 string
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    this.pdfSrc = link.href;
  }

  generateInvoice() {
    if (this.invoice) {
      this.downloadPdfFromBase64(this.invoice.invoice, 'Invoice');

      setTimeout(() => {
        localStorage.clear();
      }, 1000);
    } else {
      this.isError = true;
    }
  }

  sendMail() {
    this.mailService.sendMail('pateljil16@gmail.com', 'Hi').subscribe(
      (response) => {
        this.showSuccess(response.message);
      },
      (error: HttpErrorResponse) => {
        this.showError(error.message);
      }
    );
  }
}
