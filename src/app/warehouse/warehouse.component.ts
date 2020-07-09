import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../services/http-service/http-service';
import { ButtonService } from '../services/logged-service/logged-service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UserMenu } from '../menu/user-menu/user-menu.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialog } from '../dialogs/delete-dialog/delete-garden-dialog';
import { Observable } from 'rxjs';
import { removeSummaryDuplicates } from '@angular/compiler';

import { PlantDialog } from '../dialogs/plant-dialog/plant-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product-service/product-service';


interface Plant {
  type: string,
  name: string,
  producer: string,
  quantity: number
}

//'name', 'type', 'properties','producer','quantity','courier','action'

interface Request {
  name : string,
  type : string,
  time: string,
  quantity : number,
  properties : string,
  producer : string,

}


@Component({
  selector: 'warehouse',
  templateUrl: 'warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']

})


export class Warehouse {

  @ViewChild(MatTable) table : MatTable<any>;
      


  plants: JSON[];
  sortedData: any;

  filterForm: FormControl = new FormControl();
  filterFormField: string;


  warehouse: Plant[];
  pending: boolean = false;
  pendingRequests: Request[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns = ['type', 'name', 'quantity', 'producer'];

  displayedColumns2 = ['name', 'type', 'properties','producer','quantity','courier','action'];

  constructor(private http: HttpService, private productService : ProductService, private dialog: MatDialog) {
    this.http.getWarehouse().subscribe(result => {
      
      this.warehouse = result.warehouse as Plant[];
      this.sortedData = this.warehouse;

    })
  }

  isPlant(obj): boolean {
    if (obj.type == "plant") {
      return true;
    } else {
      return false;
    }
  }

  showPending() {
    this.productService.getOrders().subscribe(result=>{
      console.log(result);

      let date = new Date();
      
     
    
      this.pending = true;
      this.pendingRequests = result.response as Request[];
    })
    
  }

  cancelOrder(elem){
    let index = this.pendingRequests.indexOf(elem);
    //this is a much better method for 
    //refreshing table data
    let orderId = elem.orderId;

    this.pendingRequests.splice(index,1);
    this.table.renderRows();
    let user = this.http.getUserInfo().username;
    elem.user = user;
    
    console.log(user);
    console.log(elem);
    this.productService.cancelOrder(elem).subscribe();
}

  showWarehouse() {
    
    this.pending = false;
  }



  sortData(sort: Sort) {
    
    const data = this.warehouse.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: Plant, b: Plant) => {
      const isAsc = sort.direction === 'asc';
      
      switch (sort.active) {
        case 'name': {

          return compare(a.name, b.name, isAsc)
        };
        case 'producer': return compare(a.producer, b.producer, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);

        default: return 0;
      }
    }).filter(x => { return x });

  }




}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}