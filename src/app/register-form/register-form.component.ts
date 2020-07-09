import { Component, Directive, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

import { HttpService } from '../services/http-service/http-service';
import { Farmer } from '../models/farmer';
import { Company } from '../models/company';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { PlatformLocation } from '@angular/common';
import { CaptchaComponent } from 'angular-captcha';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';





@Component({
  selector: 'register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['./register-form.component.scss']

})
export class RegisterForm {

  @ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;


  showCaptcha: boolean = false;
  myCaptcha: string;
  values: any;
  registered: FormGroup;
  submitted: boolean = false;

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {

    this.registered = new FormGroup({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"),
        
      ])),
      name: new FormControl('', Validators.required),
      surrname: new FormControl('', Validators.required),
      repeat: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required)
    },{validators : this.passwordsValidator}
    )
    let sent = { target: { id: "comp" } };
    this.onChange(sent);

  }
  passwordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    if(this.registered){
      let pass = this.registered.get('password').value;
      let confirmPass = this.registered.get('repeat').value;
  
      return pass === confirmPass ? null : { notSame: true }
    } else {
      return null;
    }
   
  };

  

  showCaptchaB() {
    console.log("showing captcha");
    this.showCaptcha = true;
  }

  isValid(): boolean {
    console.log(this.registered.valid);
    return this.registered.valid;
  }

  logEvent(obj) {
    console.log(this.registered);
    console.log(obj);
  }
  resolved(captchaResponse: string) {
  

      this.http.validateToken(captchaResponse).subscribe(result => {
        console.log(result);
        if (result.success == true) {
          this.register();
          this.submitted = true;
        } else {
          this.router.navigate(['register'], { relativeTo: this.route });
        }
      })
    
    console.log(`Resolved response token: ${captchaResponse}`);

  }

  userType: boolean = true;

  mistakeLabel: string = 'farmer';

  setLabel(value: string) {

    this.mistakeLabel = value;

  }

  onChange(event) {
    let target = event.target;
    if (target.id == 'firm') {

      this.userType = false;
      this.registered.setValue(
        { mail: "", name: "", username: "", password: "", surrname: "/", repeat: "", date: "", number: "/", place: "" });


    } else {
      this.registered.setValue(
        { mail: "", name: "", username: "", password: "", surrname: "", repeat: "", date: "", number: "", place: "" });
      this.userType = true;
    }
  }

  register() {


    if (this.registered.value.repeat == this.registered.value.password && this.registered.value.mail) {
      let sendUser = {} as User;
      if (this.userType) {

        this.values = this.registered.value;

        sendUser = {
          type: "farmer",
          firstName: this.registered.value.name,
          username: this.registered.value.username,
          lastName: this.registered.value.surrname,
          password: this.registered.value.password,
          repeat: this.registered.value.repeat,
          id: this.registered.value.username,
          email: this.registered.value.mail,
          date: this.registered.value.date,
          number: this.registered.value.number,
          place: this.registered.value.place,
          garden: [],
          warehouse: [
            { type: "plant", name: "biljka1", producer: "nepoznati1", quantity: 20 },
            { type: "chemical", name: "prozivod1", producer: "nepoznati1", quantity: 10 },
            { type: "plant", name: "biljka2", producer: "nepoznati2", quantity: 2 },
            { type: "plant", name: "biljka3", producer: "nepoznati3", quantity: 15 },
            { type: "chemical", name: "prozivod2", producer: "nepoznati2", quantity: 2 },

          ]
        } as Farmer;
      } else {
        sendUser = {
          type: "company",
          firmName: this.registered.value.name,
          username: this.registered.value.username,
          email: this.registered.value.mail,
          place: this.registered.value.place,
          number: this.registered.value.number,
          password: this.registered.value.password,
          repeat: this.registered.value.repeat,
          date: this.registered.value.date,
          shop: [],
          orders: []
        } as Company;
      }
      console.log(sendUser);
      return this.http.register(sendUser).subscribe(result => {

        if (result.status != "registered") {

          this.registered.value.password.markAsDirty();
          this.setLabel("Lozinka ili mejl neipsravni");
          console.log(result);
        } else {
          //console.log("registrovani ste");
          //this.router.navigate(['/']);
        }
      });

    } else {
      this.setLabel("Lozinka ili mejl neispravni");
      return false;
    }




  }

  goBack() {
    this.router.navigate(['login']);
  }

}