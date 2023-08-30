import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/v1/products');
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/v1/products/', product);
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`/api/v1/products/${id}`);
  }

  public updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`/api/v1/products/${id}`, product);
  }

  public searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/v1/products/search?keywords=${query}`);
  }

  public fetchProductSuggestions(query: string): Observable<string[]> {
    return this.http.get<string[]>(
      `/api/v1/products/autocomplete?query=${query}`
    );
  }

  public fetchProductDetailsByName(query: string): Observable<Product> {
    return this.http.get<Product>(`/api/v1/products/name?query=${query}`);
  }
}
