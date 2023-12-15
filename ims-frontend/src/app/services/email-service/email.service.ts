import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseUrl: string = 'api/v1/mail';

  constructor(private http: HttpClient) {}

  public sendMail(
    email: string,
    message: string,
    subject?: string,
    fileName?: {
      // Ensure the variable name here matches your backend
      customerName?: string;
      orderId?: string;
    }
  ): Observable<any> {
    const requestBody = {
      recipient: email,
      subject: subject,
      message: message,
      filename: fileName, // Use 'filename' instead of 'fileName'
    };

    return this.http.post<any>(`${this.baseUrl}/`, requestBody);
  }
}
