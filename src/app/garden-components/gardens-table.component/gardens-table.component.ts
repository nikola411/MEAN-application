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
    hasGardens : boolean = true;

    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private http: HttpService,
        private router: Router,
        private gardenService: GardenService,
        private dialog: MatDialog) {
            this.gardenService.showGardens().subscribe(result=>{
               
                this.gardens.data = result.garden;
                if(this.gardens.data.length ==0){
                    this.hasGardens = false;
                } else {

                    //this should be done in service
                    //but linking subscribes is not good
                    let now = new Date();
                    if(result.lastChecked == null){

                        this.gardenService.firstCheck({ lastChecked : now}).subscribe();
                    } else {
                        let checked = new Date(result.lastChecked);
                        let diff = (now.getTime()-checked.getTime())/1000/60/60;
                        if(diff > 1){
                            for(let i in this.gardens.data){
                                this.gardens.data[i].temp-=Math.floor(diff);
                                this.gardens.data[i].water -= Math.floor(diff);
                                if(this.gardens.data[i].water < 0) this.gardens.data[i].water = 0;
                                if(this.gardens.data[i].temp<-21) this.gardens.data[i].temp = -21;
                            }
                            this.gardenService.updateGardensConditions({gardens : this.gardens.data, lastChecked : now}).subscribe();
                        }
                       
                    }
               
               
                }
                
                
                
                
            })
          
    }


    displayedColumns: string[] = ['ime', 'mesto', 'broj biljaka', 'voda','temperatura', 'izbrisi'];

    gardenInView: JSON[];


    tableClicked(obj) {

        this.gardenService.setGarden(obj);
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