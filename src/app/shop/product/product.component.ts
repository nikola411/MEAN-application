import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { ProductService } from 'src/app/services/product-service/product-service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Farmer } from 'src/app/models/farmer';
import { Router } from '@angular/router';

export interface productTemplate {
    name: string;
    price: string;
    quantity: string;
    properties: string;
    comments: [];
    rating: number;

}


@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['./product.component.scss'],

})
export class Product {

    product1: any = {};
    ordering = false;
    maximum : number = 0;
    quantity : FormControl;
 
    

    canRate : boolean = false;

    ratedArr : boolean[] = [false,false,false,false,false];
    isCommenting : boolean = false;


    comment = new FormGroup({
        text: new FormControl('', Validators.required)
    });


    first = true;

    constructor(private http: HttpService, 
                private router : Router,
                private productService: ProductService, 
                private ref: ChangeDetectorRef) {
        this.productService.getProduct().subscribe(result => {
            console.log(result)
            this.product1 = JSON.parse(JSON.stringify(result.product));
            this.productService.setProduct(this.product1);
            this.canRate = result.canRate;
            this.maximum = this.product1.quantity;
            console.log(this.product1);
            console.log(this.quantity);
            this.quantity = new FormControl('',  Validators.compose([
                Validators.required,
                Validators.max(this.maximum) 
            ]));
        
     

        })
    }

    hasComments(): boolean {
        if (this.product1.comments) {
            //return this.product1.comments.length>0 ? true : false; 

            return true;
        } else return false;

    }

    submitComment() {
        let userRating = 0;
        for(let i=0;i<5;i++){
            if(this.ratedArr[i]){
                userRating++;
            }
        }
        let user = this.http.getUser();
        console.log(user);
        let userInfo = this.http.getUserInfo();
        //console.log(userInfo)
        this.product1.comments.push({ text: this.comment.value.text, user: user, rating : userRating });
        this.canRate = false;
        this.productService.submitComment({ product: this.product1, comment: this.comment.value.text, rating : userRating }).subscribe(result => {

            this.comment.setValue({ 'text': '' });
        });

    }

    orderProductForm(){
        this.ordering = true;
    }

    cancelOrdering(){
        this.ordering = false;
    }

    finishOrder() {
        
        let user = this.http.getUserInfo();
        console.log(user);
        let userCred = {
            user : user.username,
            email: user.email,
            phone: user.number,
            place: user.place,
            name : user.firstName +" " + user.lastName
        };
        console.log(userCred);
        console.log(this.product1);
        let order = {
            company: this.product1.producer,
            product: this.product1.name,
            type : this.product1.type,
            properties : this.product1.properties,
            price : this.product1.price,
            user: userCred,
            quantity : this.quantity.value,
            orderId : this.product1.orderId
        };
        console.log(order);

        this.productService.orderProduct(order).subscribe(result => {
            this.router.navigate(['shop/all']);
         
        })
    }

    leaveComment(){
        this.isCommenting = true;
    }

    backToComments(){
        this.isCommenting = false;
    }

    rated(event){
        let index = parseInt(event);
        if(this.ratedArr[index]){
            for(let i = index; i<5;i++){
                this.ratedArr[i]=false;
            }
        }
        else {
            for(let i=0;i<index;i++){
                this.ratedArr[i]=true;
            }
        }
    }

   

}

