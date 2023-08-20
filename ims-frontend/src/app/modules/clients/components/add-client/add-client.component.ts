import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent {
  clientForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.clientForm = formBuilder.group({
      companyName: ['', Validators.required], // Company Name (Required)
      mailingName: [''], // Mailing Name
      address: ['', Validators.required], // Address (Required)
      country: ['', Validators.required], // Country (Required)
      state: ['', Validators.required], // State (Required)
      pinCode: ['', Validators.required], // Pin Code (Required)
      telephone: ['', Validators.required], // Telephone (Required)
      email: ['', [Validators.required, Validators.email]], // Email (Required and must be a valid email)
      financialYearFrom: ['', Validators.required], // Financial Year From (Required)
      booksBeginningFrom: ['', Validators.required], // Books Beginning From (Required)
      securityControl: formBuilder.group({
        password: ['', Validators.required], // Password (Required)
        confirmPassword: ['', Validators.required], // Confirm Password (Required)
      }),
      currencySymbol: ['', Validators.required], // Currency Symbol (Required)
      currencyName: ['', Validators.required], // Formal Name of Currency (Required)
      decimalPlaces: ['', Validators.required], // Decimal Places (Required)
      isGSTApplicable: ['', Validators.required], // Is GST Applicable (Required)
      stateOfRegistration: ['', Validators.required], // State of Registration (Required)
      statutoryInformation: formBuilder.group({
        taxRegistrationNumber: ['', Validators.required], // Tax Registration Number (Required)
        panNumber: ['', Validators.required], // PAN Number (Required)
        // Add more statutory information fields and validators as needed
      }),
      dataPath: ['', Validators.required], // Data Path (Required)
      maintain: ['', Validators.required], // Maintain (Required)
      tdsDetails: formBuilder.group({
        tdsRegistrationNumber: ['', Validators.required], // TDS Registration Number (Required)
        tdsAmount: ['', Validators.required],
      }),
      exciseDetails: formBuilder.group({
        exciseRegistrationNumber: ['', Validators.required], // Excise Registration Number (Required)
        exciseAmount: ['', Validators.required],
      }),
      payrollDetails: formBuilder.group({
        employeeName: ['', Validators.required], // Employee Name (Required)
        employeeID: ['', Validators.required],
      }),
    });
  }

  onSubmit() {}
}
