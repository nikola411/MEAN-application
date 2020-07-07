import { Component, OnInit } from '@angular/core';
import {FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpService } from '../services/http-service/http-service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
import {AppComponent} from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonService } from './../services/logged-service/logged-service';


@Component({
  selector: 'input-form',
  templateUrl:'form-input.comonent.html' , 
  styleUrls : ['./input-form.component.scss']
  
})
export class InputForm  {

  constructor(private loginService : HttpService, private router:Router, private route : ActivatedRoute, private buttonService : ButtonService) {}

  notLoggedIn : boolean = true;
  loginCredBad = false;

  @Output() loggedIn = new EventEmitter<boolean>();

  input = new FormControl('', Validators.compose([
		Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ]));
  password = new FormControl('');

  onSubmit(){
    this.loginService.login(this.input.value, this.password.value)
      .subscribe(result =>{

        //server odredjuje rutu u aplikaciji
        //ako je dobar login onda salje na user page
        //ako je los unos onda ponovo na login
        //ako ne postoji korisnik na register
        //let object = JSON.parse(JSON.stringify(result));
       // console.log(result);
        if(result.route != "/login" || result.route != "/register") {
         console.log(result.user);
          this.buttonService.setInfo(result.user.type);
          this.loginService.setUser({type : result.user.type, username : result.user.username, user : result.user});
          //console.log(result);
          this.router.navigate([result.route]);
        } 
        
       
  
        })
   
    
  }

  register(){
    this.router.navigate(['register']);
  }
 
}