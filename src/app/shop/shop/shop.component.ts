import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { ProductService } from 'src/app/services/product-service/product-service';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop-service/shop.service';

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

    displayedColumns = [ 'compName','product','price','location','quantity', 'options' ];

    constructor (private shopService:ShopService, private productService : ProductService, private router:Router){
        this.shop = new Array<any>();
        this.shopService.shop().subscribe(result => {
            let i,j;

            let firmName = "";
            let location = "";
           //show only companies that have products
            for(i in result){
                
                firmName = result[i].firmName;
                location = result[i].place;
                if(result[i].shop.length != 0){

                    for(j in result[i].shop){
                        let elem = new shopElement();
                        elem.companyName = firmName;
                        elem.companyLocation = location;
                        elem.product = result[i].shop[j].name;
                        elem.quantity = result[i].shop[j].quantity;
                        elem.price = result[i].shop[j].price;
                        
                        this.shop.push(elem);
                     }

                } 
            }
           
            this.tableSource.data = this.shop;
            
        });
    }

    showProduct(prod){
        
        this.productService.setProduct(prod);
        this.router.navigate(['shop/product']);

    }
}