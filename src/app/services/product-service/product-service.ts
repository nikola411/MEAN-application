import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn : 'root'
})
export class ProductService{
    private product = null;

    getProductRoute = "/api/shop/product";
    submitCommentRoute = "/api/shop/product/add/comment";
    orderProductRoute = "/api/shop/product/order"; 
    canRateProductRoute = "/api/shop/product/rate";
    getOrdersRoute = "/api/shop/user/orders";

    cancelOrderRoute = "/api/shop/user/orders/cancel";
    

    constructor(private http : HttpClient){}

    setProduct(prod){
        this.product = prod;
    }

    getProduct():Observable<any> {
        //console.log("iz servisa")
        console.log(this.product);
        return this.http.post(this.getProductRoute, this.product);
    }

    canRate(user):Observable<any>{
        
        let request = {user : user, product : this.product.name, company : this.product.producer};
        return this.http.post(this.canRateProductRoute, request);
    
    }

    submitComment(comm):Observable<any>{
        return this.http.post(this.submitCommentRoute, comm);
    }

    orderProduct(product):Observable<any>{
        return  this.http.post(this.orderProductRoute, product); 
        
    }



    getOrders():Observable<any>{
        return this.http.post(this.getOrdersRoute, null);
    }
    cancelOrder(order):Observable<any>{

        let cancel = {firmName : order.firmName, product : order.product, quantity : order.quantity, user : order.user, orderId : order.orderId};

        return this.http.post(this.cancelOrderRoute, cancel);
    }


}