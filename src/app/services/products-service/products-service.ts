import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { userInfo } from 'os';


@Injectable({
    providedIn : 'root'
})
export class ProductsService{
    private subject = new Subject<any>();

    receiveProducts(){
        return this.subject.next();
    }


    onEvent():Observable<any>{ 
        return this.subject.asObservable();
    }

    sendProducts(products){
        
        return this.subject.next(products);
    }

    refresh(){
        return;
    }
}