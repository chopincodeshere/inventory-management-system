import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  _url = 'api/v1/orders';

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this._url}/`);
  }

  public createOrder(amount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this._url}`, { amount }, { headers });
  }

  public getRazorApiKey(): Observable<any> {
    return this.http.get<any>(`${this._url}/key`);
  }
}
