import { Component } from '@angular/core';
import {FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { HttpService } from '../services/http-service/http-service';
import { Farmer } from '../models/farmer';
import { Company } from '../models/company';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'register-form',
  templateUrl:'register-form.component.html' , 
  styleUrls : ['./register-form.component.scss']
  
})
export class RegisterForm {

  constructor(private http:HttpService, private router:Router, private route:ActivatedRoute){};

  mail = new FormControl('', Validators.compose([
		Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]));
  username = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);
  name = new FormControl('', Validators.required);
  surrname = new FormControl('',Validators.required);
  repeat = new FormControl('',Validators.required);
  date = new FormControl('',Validators.required);
  number = new FormControl('',Validators.required);
  place = new FormControl('',Validators.required);

  userType :boolean = true;

  mistakeLabel : string = 'farmer';

  setLabel(value : string ){
    console.log("greska");
    this.mistakeLabel = value;
  }

  onChange(event){
    let target = event.target;
    console.log("event");
    if(target.id == 'firm'){
      this.userType = false;
      
    } else  {
      this.userType = true;
    }
  }

  register(){
   
    
    if(this.repeat.value == this.password.value && this.mail.valid){
      let sendUser = {} as User;
      if (this.userType) {
        
        sendUser = {
          firstName: this.name.value,
          username: this.username.value,
          lastName: this.surrname.value,
          password: this.password.value,
          repeat: this.repeat.value,
          id: this.username.value,
          email: this.mail.value,
          date: this.date.value,
          number: this.number.value,
          garden : [],
          warehouse : [
            {type : "plant", name : "biljka1", producer : "nepoznati1", quantity : 20},
            {type : "chemical", name : "prozivod1", producer : "nepoznati1", quantity : 10},
            {type : "plant", name : "biljka2", producer : "nepoznati2", quantity : 2},
            {type : "plant", name : "biljka3", producer : "nepoznati3", quantity : 15},
            {type : "chemical", name : "prozivod2", producer : "nepoznati2", quantity : 2},

          ]
        } as Farmer;
      } else {
          sendUser = {
            firmName : this.name.value,
            username : this.username.value,
            email : this.mail.value,
            place : this.place.value,
            number : this.number.value,
            password : this.password.value,
            repeat : this.repeat.value,
            date : this.date.value,
            shop : []
          } as Company;
      }

      return this.http.register(sendUser).subscribe(result =>{

        if(result.status != "registered"){
            
            this.password.markAsDirty();
            this.setLabel("Lozinka ili mejl neipsravni");
            console.log(result);
        } else {
          console.log("registrovani ste");
          this.router.navigate(['/']);
        }
      });
    
    } else {
      this.setLabel("Lozinka ili mejl neispravni");
      return false;
    }

  


  }
 
}