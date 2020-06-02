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
  constructor(private router: Router, private serverService: HttpService, private buttonService: ButtonService) {

    this.buttonService.onEvent().subscribe(result => {
      if (result) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })

    this.serverService.isLogged().subscribe(result => {
      let newRoute = result.route;

      if (newRoute == "/login") {
        this.loggedIn = false;
        this.userLogged = false;
        this.adminLogged = false;
      } else  {
        this.loggedIn = true;
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
    this.router.navigate(['login']);
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

