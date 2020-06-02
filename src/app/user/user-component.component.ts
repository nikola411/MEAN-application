import { Component } from '@angular/core';
import { HttpService } from '../services/http-service/http-service';
import { ButtonService } from '../services/logged-service/logged-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UserMenu } from '../menu/user-menu/user-menu.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialog } from '../dialogs/delete-dialog/delete-garden-dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'user',
  templateUrl: 'user-component.component.html',
  styleUrls: ['./user-component.component.scss']

})


export class UserComponent {

  showForm: boolean = false;

  res: JSON = null;
  names: string[];
  places: string[];
  numOfPlants: string[];
  free: string[];
  water: string[];
  temps: string[];

  showGardenForm: boolean = false;
  showGardens: boolean = false;

  gardenInView: JSON[] = null;
  showOneGarden: boolean = false;

  gardens: object[] = null;
  displayedColumns: string[] = ['ime', 'mesto', 'broj biljaka', 'voda', 'izbrisi'];

  columnsToDisplay: string[] = [];



  constructor(private http: HttpService, private router: Router, private buttonService: ButtonService, private dialog: MatDialog) {
    http.getUserData().subscribe(result => {
      //ovde hvatamo niz rasadnika cije podatke stampamo

    })

    buttonService.onEvent().subscribe(result => {
      if (result == "garden") {
        this.showGardenForm = true;
        this.showGardens = false;
        this.showOneGarden = false;
      } else {
        if (result.garden == null) {
          this.gardens = null;
          this.showGardens = false;
        } else {
          this.gardens = Object.values(result.garden);
          this.showGardens = true;
        }


        this.showGardenForm = false;
      }
    }
    );



  }


  initColumns() {
    let i, j = 0;
    for (i in this.gardenInView) {
      this.columnsToDisplay[j] = "{{j}}";
    }
  }

  tableClicked(obj) {
    console.log(obj);
    this.http.showMyGarden(obj).subscribe(result => {
      var dummy1 = Object.values(result);
      var dummy2 = Object.values(dummy1[0]);




      this.gardenInView = dummy2[4];
      this.showGardenForm = false;
      this.showGardens = false;
      this.showOneGarden = true;
      this.initColumns();


    });
  }

  hoverPlant(obj) {

    console.log(obj);
  }

  openDialog(): Observable<string> {

    console.log("opening dialog");

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

    var ret;

    return dialogRef.afterClosed();

  }

  deleteGarden(obj) {

    this.openDialog().subscribe(result => {

      if (result == "true") {

        this.http.removeGarden(obj).subscribe(result => {
        });

      }
    }






    )
  }




}





