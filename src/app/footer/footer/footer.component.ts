import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  alert : string ="";
  numberOfAlerts : number = null;

  constructor(private http : HttpService, private router : Router) { 
    this.http.getFooterInfo().subscribe(result=>{
      this.alert = result.alert;
      this.numberOfAlerts = result.number;
      if(this.numberOfAlerts == 0){
        this.numberOfAlerts = null;
      }
    })
  } 

  ngOnInit(): void {
  }

  changePass(){
    this.router.navigate(['footer/password']);
  }

  removeAlerts(){
    this.alert = "";
    this.numberOfAlerts = null;
  }

}
