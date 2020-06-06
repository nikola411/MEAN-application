import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonService } from '../../services/logged-service/logged-service';
import { GardenForm } from '../../garden-form/garden-form.component';
import {Location} from '@angular/common';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';


@Component({
    selector: 'user-menu',
    templateUrl: 'user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']

})
export class UserMenu {

    

  constructor(private http: HttpService,
     private router: Router, 
     private buttonService: ButtonService,
     private route : ActivatedRoute, 
     private location: Location) {

  }

  logout() {
    this.http.logout().subscribe(result => {
      this.buttonService.clearInfo();
      this.router.navigate(['login']);
    });
  }

  addGarden() {
    
    this.router.navigate(['user/garden/registration'], {relativeTo : this.route});
    this.buttonService.registerGarden();
  }

  back() {
    this.location.back();
  }

  showGardens() {
   
    this.router.navigate(['user/garden/show/all'], {relativeTo : this.route});
  }

  showWarehouse(){
    this.router.navigate(['user/warehouse'], {relativeTo : this.route});
  }


}
