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

  getOrders(
    page: number = 1,
    pageSize: number = 10
  ): Observable<{
    orders: Order[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
  }> {
    const url = `${this._url}/?page=${page}&pageSize=${pageSize}`;

    return this.http.get<{
      orders: Order[];
      totalPages: number;
      totalRecords: number;
      currentPage: number;
    }>(url);
  }

  public getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this._url}/${id}`);
  }

  public createOrder(amount: number, order: Order): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(
      `${this._url}`,
      { amount: amount, order: order },
      { headers }
    );
  }

  public searchOrder(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this._url}/search?keywords=${query}`);
  }

  public getRazorApiKey(): Observable<any> {
    return this.http.get<any>(`${this._url}/key`);
  }

  public deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this._url}/${id}`);
  }
}
