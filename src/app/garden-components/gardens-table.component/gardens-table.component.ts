import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { GardenService } from '../../services/garden-service/garden-service';
import { ButtonService } from '../../services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'gardens-table',
    templateUrl: 'gardens-table.component.html',
    styleUrls: ['./gardens-table.component.scss']

})


export class GardenTable  {

    gardens: Object[];
    show: boolean = false;

    constructor(private http: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private gardenService: GardenService,
        private buttonService: ButtonService,
        private dialog: MatDialog) {

        this.buttonService.onEvent().subscribe(result => {
            if (result) {

                this.gardens = Object.values(result.garden);
            }


        })


    }


    displayedColumns: string[] = ['ime', 'mesto', 'broj biljaka', 'voda', 'izbrisi'];

    gardenInView: JSON[];


    tableClicked(obj) {

        this.http.showMyGarden(obj).subscribe(result => {

            this.gardenService.getGardenForDisplaying(result);
        }
        )
        this.router.navigate(['user/garden/show/single']);
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

        })





    }


}