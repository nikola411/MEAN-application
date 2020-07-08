import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialog } from '../product-dialog/product-dialog.component';
import { HttpService } from 'src/app/services/http-service/http-service';
import { CompanyOrders } from 'src/app/company-components/company-orders/company-orders.component';
import { CompanyService } from 'src/app/services/company-service/company-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courier-dialog',
  templateUrl: './courier-dialog.component.html',
  styleUrls: ['./courier-dialog.component.css']
})
export class CourierDialog {

  //plant : Plant;

  dataSource: Object[];

  companyLocation : string;


  empty: boolean = false;

  displayedColumns = ['id', 'busy', 'options'];

  constructor(
   
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<ProductDialog>,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) data) {

    let username = this.http.getUserInfo();
    this.companyService.getCouriers(username.username).subscribe(result => {
      console.log(result);
      this.dataSource = result.couriers;
      this.companyLocation = result.company_location;
    })
  }

  chooseCourier(obj) {

  }

  close() {
    this.dialogRef.close();
  }
  //save gets obj that represents plant
  //we need to make a 
  save(obj) {

    console.log("ovo ste izavrali");
    console.log(obj);
    //console.log(this.plant);

    this.dialogRef.close({ location : this.companyLocation, courier: obj });
  }

  noFree() {
    this.dialogRef.close({ courier: null });
  }


}
