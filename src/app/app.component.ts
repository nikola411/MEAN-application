import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './services/http-service/http-service';
import { ButtonService } from './services/logged-service/logged-service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myApp';
  loggedIn: boolean = false;
  companyLogged : boolean = false;
  @Input() loggedInUser(value: boolean) {
    console.log("event received");
    this.loggedIn = value;
  }
  appMenu : any;
  LoginClicked: boolean = false;
  RegClicked: boolean = false;
  adminLogged : boolean = false;
  userLogged : boolean = false;
  showUser = false;
  constructor(private router: Router, private serverService: HttpService, private buttonService: ButtonService,
    private route : ActivatedRoute) {

    this.buttonService.onEvent().subscribe(result => {
      console.log("treba da sklonim dugme");
      console.log(result)
      if(result.status == true){
        if (result.user=="farmer") {
          this.loggedIn = true;
        } else if(result.user == "company") {
          this.companyLogged = true;
        } else if (result.user == "admin"){
          this.adminLogged = true;
        } else {
          this.companyLogged = false;
          this.loggedIn = false;
          this.adminLogged = false;
        }
      } else {
        this.companyLogged = false;
        this.loggedIn = false;
        this.adminLogged = false;
      }
      
    })

    this.serverService.isLogged().subscribe(result => {
      let newRoute = result.route;
      let userType = result.type;
      console.log("logujem rezultat sa servera")
      console.log(result);

      if (newRoute == "login" || newRoute == "register") {
        
        this.loggedIn = false;
        this.userLogged = false;
        this.adminLogged = false;
      } else  if (userType =="farmer"){
        this.loggedIn = true;
      } else if(userType == "company") {
        this.companyLogged = true;
      } else if(userType == "admin"){
        this.adminLogged = true;
      

      }
        
      this.router.navigate([newRoute]);
    });
  };

  public uploaded: Observable<boolean> = new Observable(data => {
    return data;
  });


  clickLogin() {
    this.LoginClicked = true;
    this.RegClicked = false;
    this.router.navigate(['login'], {relativeTo : this.route});
  }

  bodyClicked() {
    this.LoginClicked = false;
    this.RegClicked = false;
    this.router.navigate(['Nesto']);
  }

  regClick() {
    this.RegClicked = true;
    this.LoginClicked = false;
    this.router.navigate(['register']);
  }
  reveal(agreed: boolean) {

    console.log("big reveal");
    this.showUser = true;
  }



 

  

}

