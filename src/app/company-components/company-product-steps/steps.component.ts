import { Component } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { FormControl, Validators } from '@angular/forms';
import { finished } from 'stream';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company-service/company-service.service';


@Component({
    selector: 'order-steps',
    templateUrl:'steps.component.html' , 
    styleUrls : ['./steps.component.scss']
    
  })
  export class OrderSteps {

    i : number = 0;
    steps : boolean[] = [true,false,false,false,false];

    success : boolean = false;

    finish : boolean = false;

    k : number = 3;

    productName = new FormControl("", Validators.required);
    productQuantity = new FormControl("", Validators.required);
    productProperties = new FormControl("", Validators.required);
    productPrice = new FormControl("", Validators.required);

    type = new FormControl("");


    constructor(private companyService :CompanyService, private router:Router){

    }

    next(){

        this.steps[this.i]=false;
        this.i++;
        if(this.i<5){
            this.steps[this.i]=true;
        } else {
            this.finish = true;
        }

        console.log(this.type)
         
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
                    price : this.productPrice.value
                };
        
        this.companyService.addProduct(obj).subscribe(result=>{
            this.finish = false;
            this.success = true;
            
            this.router.navigate(['/company/products']);

        })
    }

    onChange(event){
        console.log(event);
    }
  }


