import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent {
  clientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private clientService: ClientService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      mailingName: [''],
      email: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNo: ['', Validators.required],
      mobileNo: ['', Validators.required],
      gstNumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
      financialYearFrom: ['', Validators.required],
      booksBeginningFrom: ['', Validators.required],
      tallyVaultPassword: [''],
      baseCurrencyInformation: this.formBuilder.group({
        baseCurrencySymbol: ['', Validators.required],
        formalName: ['', Validators.required],
        decimalPlaces: ['', Validators.required],
        symbolForDecimal: ['', Validators.required],
        symbolForThousands: ['', Validators.required],
      }),
    });
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

  isControlInvalidAndDirty(controlName: string): boolean | undefined {
    const control = this.clientForm.get(controlName);
    return control?.invalid && control?.dirty;
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientService.addClient(this.clientForm.value).subscribe(
        (response: any) => {
          this.showSuccess(response.message);
        },
        (error: HttpErrorResponse) => {
          this.showError(error.status + ' ' + error.message);
        }
      );

      this.clientForm.reset();
    } else {
      Object.keys(this.clientForm.controls).forEach((controlName) => {
        this.clientForm.get(controlName)?.markAsTouched();
      });

      this.showError('Invalid fields');
    }
  }
}
