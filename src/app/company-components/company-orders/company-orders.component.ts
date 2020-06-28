import { Component } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { CompanyService } from 'src/app/services/company-service/company-service.service';

@Component({
    selector: 'company-orders',
    templateUrl:'company-orders.component.html' , 
    styleUrls : ['./company-orders.component.scss']
    
  })
  export class CompanyOrders {

    orders : Object[] = [];

    displayedColumns = ['orderId', 'product', 'customer', 'status', 'options'];


    constructor(private http :HttpService, private buttonService : ButtonService, private companyService : CompanyService ){
      this.buttonService.onEvent().subscribe(result=>{
        this.orders = result;
      })
       this.companyService.getCompanyOrders().subscribe(result=>console.log(result));
    }

    hasOrders() : boolean{
      return this.orders.length != 0  ? true : false;
    }

  }