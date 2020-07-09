import { Component, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { CompanyService } from 'src/app/services/company-service/company-service.service';
import { ProductService } from 'src/app/services/product-service/product-service';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';
import { CourierDialog } from 'src/app/dialogs/courier-dialog/courier-dialog.component';
import { RouterOutlet, Router } from '@angular/router';

interface Courier {
  id: number,
  busy: string,
  going_to: string,
  start: Date

}

@Component({
  selector: 'company-orders',
  templateUrl: 'company-orders.component.html',
  styleUrls: ['./company-orders.component.scss']

})
export class CompanyOrders {

  @ViewChild(MatTable) table: MatTable<any>;



  orders: any[] = [];

  displayedColumns = ['orderId', 'product', 'customer', 'location', 'date', 'status', 'options'];


  constructor(private http: HttpService,
    private router : Router,
    private productService: ProductService,
    private companyService: CompanyService,
    private dialog: MatDialog) {

    this.companyService.getCompanyOrders().subscribe(result => {
      /*console.log(result)
      for(let i in result.orders){
        if(result.orders[i].status !="canceled" && result.orders[i].status!="finished"){
          this.orders.push(result.orders[i]);
        }
      }*/
      this.orders = result.orders;

   
      for (let i in this.orders) {
        if(typeof this.orders[i].status == "number"){
          this.orders[i].status = Math.floor(this.orders[i].status);
        }
        
        this.orders[i].time = this.orders[i].time as Date;

      }
    });
  }

  hasOrders(): boolean {
    return this.orders.length != 0 ? true : false;
  }

  cancelOrder(order) {


    let index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    this.table.renderRows();

    let company = this.http.getUserInfo();

    let orderId = order.orderId;

    let request = {
      firmName: company.firmName,
      product: order.product,
      user: order.username,
      quantity: parseInt(order.quantity),
      orderId : orderId
    };


    this.productService.cancelOrder(request).subscribe(result => console.log(result));
  }

  acceptOrder(element) {
    this.openDialog().subscribe(result => {
      if (result) {
        let courier_obj = result as any;
        let courier = courier_obj.courier as Courier;
        let location = courier_obj.location;
        //console.log(courier);
        let form = { company_location : location,order : element, courier : courier};
        //console.log(form);
        this.companyService.employCourier(form).subscribe(result=>{
          console.log(result);
          let index = this.orders.indexOf(element);
          
          this.orders = [...result.filter(x=>x.status != "canceled")];
          this.table.renderRows();
          this.router.navigate(['company/orders']);
        })

      }

    })

  }

  openDialog(): Observable<string> {

    console.log("opening dialog");

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(CourierDialog, dialogConfig);

    return dialogRef.afterClosed();
  }
}




