import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  _url = "api/v1/orders";

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this._url}/`);
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this._url}`, order);
  }
}
