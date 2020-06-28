import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { GardenService } from '../../services/garden-service/garden-service';
import { ButtonService } from '../../services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material/table';


@Component({
    selector: 'gardens-table',
    templateUrl: 'gardens-table.component.html',
    styleUrls: ['./gardens-table.component.scss']

})


export class GardenTable {

    gardens = new MatTableDataSource<any>();
    gardensArr: Object[];
    show: boolean = false;

    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private http: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private gardenService: GardenService,
        private buttonService: ButtonService,
        private dialog: MatDialog) {
            this.gardenService.showGardens().subscribe(result=>{
                this.gardens.data = result.garden;
                
            })
          
    }


    displayedColumns: string[] = ['ime', 'mesto', 'broj biljaka', 'voda','temperatura', 'izbrisi'];

    gardenInView: JSON[];


    tableClicked(obj) {

        this.gardenService.setGarden(obj);

        /*this.http.showMyGarden(obj).subscribe(result => {
            /* result is an object of format {0: {name : '',place : '', widht: '', height:'', garden:'', water:'', temp:'', free:''}}
      so dummy1 is an array of values of fields of result(only 0) and dummy2 is an array of values of dummy 1
      (length = 7)
      


            var dummy1 = Object.values(result);
            var dummy2 = Object.values(dummy1[0]);

            this.gardenService.getGardenForDisplaying(dummy2);
        }
        )*/
        this.router.navigate(['user/garden/show/single']);
    }

    openDialog(): Observable<string> {

        console.log("opening dialog");

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;


        const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

        return dialogRef.afterClosed();

    }

    deleteGarden(obj) {

        this.openDialog().subscribe(result => {
            if (result == "true") {

                this.gardenService.removeGarden(obj).subscribe(result => {
                    this.gardens.data = result.garden;
                    this.table.renderRows();
                });
                
            }

        })

    }

}