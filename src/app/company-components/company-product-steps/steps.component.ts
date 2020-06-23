import { Component } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { FormControl, Validators } from '@angular/forms';
import { finished } from 'stream';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products-service/products-service';

@Component({
    selector: 'order-steps',
    templateUrl:'steps.component.html' , 
    styleUrls : ['./steps.component.scss']
    
  })
  export class OrderSteps {

    i : number = 0;
    steps : boolean[] = [true,false,false,false];

    success : boolean = false;

    finish : boolean = false;

    k : number = 3;

    productName = new FormControl("", Validators.required);
    productQuantity = new FormControl("", Validators.required);
    productProperties = new FormControl("", Validators.required);
    productPrice = new FormControl("", Validators.required);


    constructor(private http :HttpService, private router:Router, private productService : ProductsService){

    }

    next(){
        console.log("lol");
        this.steps[this.i]=false;
        this.i++;
        if(this.i<4){
            this.steps[this.i]=true;
        } else {
            this.finish = true;
        }
         
    }
    back(){
        this.steps[0]=true;
        this.i = 0;
        this.finish = false;
    }

    add(){
        let obj = {name : this.productName.value,
                    quantity : this.productQuantity.value,
                    properties : this.productProperties.value,
                    price : this.productPrice.value};
        
        this.http.addProduct(obj).subscribe(result=>{
            this.finish = false;
            this.success = true;
            this.productService.sendProducts(result.value.shop);
            this.router.navigate(['/company/products']);

        })
    }
  }

  function success() {
    setTimeout(function () {
        if(false){
            return ;
        }
    }, 5000);
}
