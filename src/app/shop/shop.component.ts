import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../services/http-service/http-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { copyArrayItem } from '@angular/cdk/drag-drop';

class shopElement {
    companyName : string;
    companyLocation : string;
    product : string;
    price : string;
    quantity : string;
}


@Component({
  selector: 'shop',
  templateUrl: 'shop.component.html',
  styleUrls: ['./shop.component.scss']

})
export class Shop {
    shop : shopElement[];

    @ViewChild(MatTable) table : MatTable<any>;
    tableSource = new MatTableDataSource<any>();

    displayedColumns = [ 'compName','product','price','location','quantity', 'options' ]
    constructor (private http:HttpService){
        this.shop = new Array<any>();
        this.http.shop().subscribe(result => {
            let i,j;

            let firmName = "";
            let location = "";
           
            for(i in result){
                
                firmName = result[i].firmName;
                location = result[i].place;
                if(result[i].shop.length != 0){
                    console.log(result[i]);
                    console.log(result[i].shop);
                    for(j in result[i].shop){
                        let elem = new shopElement();
                        elem.companyName = firmName;
                        elem.companyLocation = location;
                        elem.product = result[i].shop[j].name;
                        elem.quantity = result[i].shop[j].quantity;
                        elem.price = result[i].shop[j].price;
                        console.log(elem);
                        this.shop.push(elem);
                     }

                } 
            }
           
            console.log(this.shop);
            this.tableSource.data = this.shop;
            
        });
    }
}