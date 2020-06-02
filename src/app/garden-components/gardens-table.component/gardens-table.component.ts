import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { GardenService } from '../../services/garden-service/garden-service';
import { ButtonService } from '../../services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';


@Component({
    selector: 'gardens-table',
    templateUrl: 'gardens-table.component.html',
    styleUrls: ['./gardens-table.component.scss']

})


export class GardenTable implements OnInit {

    gardens: Object[];
    show : boolean = false;

    constructor(private http: HttpService,
         private gardenService: GardenService,
          private buttonService: ButtonService,
          private dialog : MatDialog) {

            this.gardenService.onEvent().subscribe(result => {
                console.log("loging");
                console.log(result);
                if (result == "show-gardens") {
                    this.show = true;
                }
                
            })
            if(this.show)
            {this.http.showGardens().subscribe(res => {
                console.log("basta koju smo dobili");
                console.log(res);
                this.gardens = Object.values(res.garden);
            })}
       
    }

    ngOnInit(){

     

    }

    displayedColumns: string[] = ['ime', 'mesto', 'broj biljaka', 'voda', 'izbrisi'];

    gardenInView: JSON[];


    tableClicked(obj) {
        console.log(obj);
        this.http.showMyGarden(obj).subscribe(result => {
            var dummy1 = Object.values(result);
            var dummy2 = Object.values(dummy1[0]);

            this.gardenService.onEvent()
            this.gardenInView = dummy2[4];

            this.gardenService.getGardenForDisplaying(this.gardenInView);




        });
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