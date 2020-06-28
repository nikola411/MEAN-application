import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn : 'root'
})
export class ProductService{
    private product = null;

    getProductRoute = "/api/shop/product";

    constructor(private http : HttpClient){}

    setProduct(prod){
        this.product = prod;
    }

    getProduct():Observable<any> {
        return this.http.post(this.getProductRoute, this.product);
    }

}