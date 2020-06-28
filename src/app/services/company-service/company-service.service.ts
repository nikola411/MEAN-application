import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  ordersRoute = "/api/company/orders";
  productsRoute = "/api/company/products";
  addProductRoute = "/api/company/product/add";
  removeProductRoute = "/api/company/product/remove";

  constructor(private http: HttpClient) { }

  getCompanyOrders(): Observable<any> {
    return this.http.post(this.ordersRoute, null);
  }

  getCompanyProducts(): Observable<any> {
    return this.http.post(this.productsRoute, null);
  }

  addProduct(product): Observable<any> {
    return this.http.post(this.addProductRoute, product);
  }

  removeProduct(product): Observable<any> {
    return this.http.post(this.removeProductRoute, product);
  }



}
