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


@Component({
  selector: 'warehouse',
  templateUrl: 'warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']

})


export class Warehouse {

    plants : JSON[];
    warehouse : JSON[];
    pending : JSON[];
    

    displayedColumns  = [ 'ime', 'kolicina', 'proizvodjac'];

}