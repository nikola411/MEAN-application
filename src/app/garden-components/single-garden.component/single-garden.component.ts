import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { GardenService } from '../../services/garden-service/garden-service';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';

@Component({
    selector: 'single-garden',
    templateUrl: 'single-garden.component.html',
    styleUrls: ['./single-garden.component.scss']

})


export class SingleGarden {

    gardenInView: JSON[];

    columnsToDisplay : string[] = [];

  

    constructor(private http: HttpService,
        private buttonService: ButtonService,
        private gardenService : GardenService,
        private dialog: MatDialog) {

            this.gardenService.onEvent().subscribe(result =>{
                this.gardenInView = result;
                this.initColumns();
            });
    }

    initColumns(){
        let i, j=0;
        for(i in this.gardenInView){
          this.columnsToDisplay[j] = "{{j}}";
        }
      }

      
  hoverPlant(obj){
    
    console.log(obj);
  }




}
