import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpService } from '../../services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonService } from '../../services/logged-service/logged-service';
import { GardenForm } from '../../garden-form/garden-form.component';
import { Location } from '@angular/common';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ProductsService } from 'src/app/services/products-service/products-service';


@Component({
  selector: 'company-menu',
  templateUrl: 'company-menu.component.html',
  styleUrls: ['./company-menu.component.scss']

})
export class CompanyMenu {



  constructor(private http: HttpService,
    private router: Router,
    private productService : ProductsService,
    private buttonService : ButtonService,
    private route: ActivatedRoute,
    private location: Location) {

  }

  logout() {
    this.http.logout().subscribe(result => {
      this.buttonService.clearInfo("company");
      this.router.navigate(['login']);
    });
  }

  showOrders() {
    this.router.navigate(['/company/orders'], { relativeTo: this.route });
  }

  showProducts() {
     
    
        this.router.navigate(['/company/products'], { relativeTo: this.route });
    
   
    
  }

  showStats() {

  }

  back() {
    this.location.back();

  }
}