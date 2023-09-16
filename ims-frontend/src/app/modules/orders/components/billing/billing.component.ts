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
  recipient: any;
  message: string;

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

    this.recipient = JSON.parse(localStorage.getItem('clientInfo'));

    this.message = `Dear ${this.recipient.customerName},

    Thank you for choosing Kalyan Traders for your recent purchase. We truly appreciate your business and trust in our products/services.
    
    Below is your bill of your purchase:
    
    If you have any questions or need further assistance regarding your purchase 
    or our products/services, please don't hesitate to contact us 9998005464.
    
    We look forward to serving you again in the future. Your satisfaction is our top priority!
    
    Best regards,
    Lukesh Patel
    Kalyan Traders`;
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

  sendInvoice() {
    this.mailService
      .sendMail(
        this.recipient.customerEmail,
        this.message,
        'Invoice for your purchase',
        {
          customerName: this.invoice.customerName,
          orderId: this.invoice.orderId,
        }
      )
      .subscribe(
        (response) => {
          this.showSuccess(response);
        },
        (error: HttpErrorResponse) => {
          this.showError(error.message);
        }
      );
  }
}
