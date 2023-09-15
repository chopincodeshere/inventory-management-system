import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl: string = '/api/v1/';
  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]> {
    const url = `${this.baseUrl}/clients/`;
    return this.http.get<Client[]>(url);
  }

  public getClientById(id: string): Observable<Client> {
    const url = `${this.baseUrl}clients/${id}/`;
    return this.http.get<Client>(url);
  }

  public addClient(client: Client): Observable<Client> {
    const url = `${this.baseUrl}clients/`;
    return this.http.post<Client>(url, client);
  }

  public updateClient(client: Client, id: string): Observable<Client> {
    const url = `${this.baseUrl}/clients/${id}/`;
    return this.http.patch<Client>(url, client);
  }

  public searchClient(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/clients/search?keywords=${query}`
    );
  }

  public deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.baseUrl}/clients/${id}`);
  }

  public fetchCustomerNameSuggestions(query: string): Observable<string[]> {
    if (!query) {
      return this.http.get<string[]>(`${this.baseUrl}/clients/autocomplete`);
    }

    return this.http.get<string[]>(
      `${this.baseUrl}/clients/autocomplete?query=${query}`
    );
  }

  public getClientByName(query: string): Observable<Client> {
    return this.http.get<Client>(`/api/v1/clients/name?query=${query}`);
  }

  public addCreditAmount(id: string, creditDetails: any): Observable<Client> {
    const url = `${this.baseUrl}clients/credit/${id}/`;
    return this.http.patch<Client>(url, creditDetails);
  }

  public addTotalSales(
    id: string,
    netAmount: number,
    grossAmount: number
  ): Observable<any> {
    const requestBody = {
      netAmount: netAmount,
      grossAmount: grossAmount,
    };

    return this.http.patch(`${this.baseUrl}clients/sales/${id}`, requestBody);
  }
}
