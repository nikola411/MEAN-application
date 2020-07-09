import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http-service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  error : string = "";
  password : FormGroup = new FormGroup({
    newPassword : new FormControl("",Validators.compose([
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")
    ])),
    repeat : new FormControl("",Validators.compose([
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")
    ]))
  });

  constructor(private http : HttpService) {

  }

  ngOnInit(): void {
  }

  change(){
    if(this.password.get('newPassword').value!=this.password.get('repeat').value){
      this.error = "Pogresno uneta lozinka";
      //console.log("Pogresno ukucana lozinka");
    } else {
      console.log(this.password.get('newPassword'))
      this.http.changePassword({password : this.password.get('newPassword').value}).subscribe(result=>{
        console.log(result);
      });
    }
  }

}
