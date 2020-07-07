import { Component } from '@angular/core';
import { HttpService } from '../services/http-service/http-service';
import { ButtonService } from '../services/logged-service/logged-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'user',
  templateUrl: 'user-component.component.html',
  styleUrls: ['./user-component.component.scss']

})


export class UserComponent {



  constructor(private http: HttpService,
     private router: Router,
      private buttonService: ButtonService,
       private dialog: MatDialog,
       private route : ActivatedRoute) {
    http.getUserData().subscribe(result => {
      console.log(result);
      //ovde hvatamo niz rasadnika cije podatke stampamo

    })

    



  }

}





