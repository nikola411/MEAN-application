import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { ProductService } from 'src/app/services/product-service/product-service';
import { FormControl } from '@angular/forms';

export interface productTemplate { 
    name : string;
    price : string;
    quantity : string;
    properties : string;
    comments : [];
    rating : number;

}


@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['./product.component.scss'],

})
export class Product  {

    public product1: any ={};
    product2: any = {};
    product3 : any;

    comment = new FormControl();


    first = true;
  
    constructor(private http : HttpService, private productService : ProductService, private ref:ChangeDetectorRef){
        this.productService.getProduct().subscribe(result=>{
         
               
            this.product1 = JSON.parse(JSON.stringify(result.product));  

        })
    }

    hasComments():boolean{
        return this.product1.comments.length>0 ? true : false;
    }

    submitComment(){
        
    }

}

