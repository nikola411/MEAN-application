import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { ProductService } from 'src/app/services/product-service/product-service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Farmer } from 'src/app/models/farmer';

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
    product2: any = {};
    product3: any;
    quantity = new FormControl('', Validators.required);

    canRate : boolean = false;

    ratedArr : boolean[] = [false,false,false,false,false];
    isCommenting : boolean = false;


    comment = new FormGroup({
        text: new FormControl('', Validators.required)
    });


    first = true;

    constructor(private http: HttpService, private productService: ProductService, private ref: ChangeDetectorRef) {
        this.productService.getProduct().subscribe(result => {
            console.log(result);
            this.product1 = JSON.parse(JSON.stringify(result.product));
            this.productService.setProduct(this.product1);
            this.canRate = result.canRate;
            console.log(result);
            let user = this.http.getUser();
           // this.productService.canRate(user).subscribe(result=>{
           //     this.canRate = result.canRate;
           // })
            //console.log(this.product1);
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
            //console.log(result);

            // this.product1.comments = [...this.product1.comments.push()];
            // this.product1.comments.push({comment : this.comment.value.text, user : user });
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
            username: user.username,
            email: user.email,
            phone: user.number,
            place: user.place
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
            quantity : this.quantity.value
        };
        console.log(order);

        this.productService.orderProduct(order).subscribe(result => {
            let user = this.http.getUserInfo() as Farmer;
            let start = user.place;
            let goingTo = this.product1.place;

            //this.productService.getCourier({ start: start, goingTo: goingTo }).subscribe(result => {
            //    console.log("uspesno ste narucili proizvod");
           // })
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

