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
    attachment?: string
  ): Observable<any> {
    const requestBody = {
      email: email,
      message: message,
      attachment: attachment,
    };

    return this.http.post<any>(`${this.baseUrl}/`, requestBody);
  }
}
