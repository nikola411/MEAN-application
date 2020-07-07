import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopRoute = "/api/shop";

  constructor(private http : HttpClient) { }

  shop():Observable<any>{
    return this.http.post(this.shopRoute, null);
  }


  
}
