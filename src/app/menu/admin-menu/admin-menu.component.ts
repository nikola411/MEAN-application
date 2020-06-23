import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonService } from '../../services/logged-service/logged-service';

import { Location } from '@angular/common';

import { ProductsService } from 'src/app/services/products-service/products-service';


@Component({
  selector: 'admin-menu',
  templateUrl: 'admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']

})
export class AdminMenu {



  constructor(private http: HttpService,
    private router: Router,
    private productService : ProductsService,
    private buttonService : ButtonService,
    private route: ActivatedRoute,
    private location: Location) {

  }

  logout() {
    this.http.logout().subscribe(result => {
      this.buttonService.clearInfo("admin");
      this.router.navigate(['login']);
    });
  }

  showUsers() {
    this.router.navigate(['admin/users']);
  }

  showPending() {
   this.router.navigate(['admin/requests']);
    
  }

  back() {
    this.location.back();

  }
}
