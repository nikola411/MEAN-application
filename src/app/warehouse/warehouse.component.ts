import { Component } from '@angular/core';
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


@Component({
  selector: 'warehouse',
  templateUrl: 'warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']

})


export class Warehouse {

    plants : JSON[];
    warehouse : JSON[];
    pending : boolean = false;
    pendingRequests : JSON[];
    

    displayedColumns  = [ 'tip','ime', 'kolicina', 'proizvodjac'];

    constructor(private http : HttpService, private dialog : MatDialog ){
      this.http.getWarehouse().subscribe( result => {
        console.log(result);
        this.pending = result.pending;
        this.warehouse = result.warehouse;
        this.showWarehouse();
        
      })
    }

    isPlant(obj):boolean {
      if(obj.type == "plant") {
        return true;
      } else {
        return false;
      }
    }

    showPending(){
      this.pending = true;
    }

    showWarehouse(){
      console.log("showing warehouse")
      this.pending = false;
    }

    

}