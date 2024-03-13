// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllProducts(page: number, pageSize: number) {
    return this.http.get<any[]>(`${this.baseUrl}/products?page=${page}&pageSize=${pageSize}`);
  }

  addProduct(productData: any) {
    return this.http.post<any>(`${this.baseUrl}/products`, productData);
  }
}
