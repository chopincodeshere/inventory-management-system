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
    const url = `${this.baseUrl}/clients/`;
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
}
