import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/services/client-service/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent {
  _id: string;
  client: Client;

  edit_client: FormGroup;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.edit_client = this.formBuilder.group({
      name: ['', Validators.required],
      mailingName: [''],
      email: [''],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNo: ['', Validators.required],
      mobileNo: ['', Validators.required],
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

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id')!;
    
    this.clientService.getClientById(this._id).subscribe(
      (response) => {
        this.client = response;

        this.edit_client.patchValue({
          financialYearFrom: this.client.financialYearFrom,
          booksBeginningFrom: this.client.booksBeginningFrom,
          email: this.client.email,
          name: this.client.name,
          mailingName: this.client.mailingName,
          address: this.client.address,
          country: this.client.country,
          state: this.client.state,
          pincode: this.client.pincode,
          phoneNo: this.client.phoneNo,
          mobileNo: this.client.mobileNo,
          baseCurrencyInformation: this.client.baseCurrencyInformation,
        });
      },
      (error: HttpErrorResponse) => {
        this.showError(error.status + '. Error fetching data');
      }
    );
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
    const control = this.edit_client.get(controlName);
    return control?.invalid && control?.dirty;
  }

  navigateBack() {
    this.router.navigateByUrl(`/clients/all-clients`);
  }

  onSubmit() {
    if (this.edit_client.valid) {
      this.clientService
        .updateClient(this.edit_client.value, this._id)
        .subscribe(
          (response: any) => {
            this.showSuccess(response.message);
          },
          (error: HttpErrorResponse) => {
            this.showError(error.status + ' ' + error.message);
          }
        );
    } else {
      this.showError('Invalid fields');
      Object.keys(this.edit_client.controls).forEach((controlName) => {
        this.edit_client.get(controlName)?.markAsTouched();
      });
    }
  }
}
