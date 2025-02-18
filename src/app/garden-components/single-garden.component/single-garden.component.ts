import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { GardenService } from '../../services/garden-service/garden-service';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';
import { Router } from '@angular/router';
import { PlantDialog } from 'src/app/dialogs/plant-dialog/plant-dialog.component';
import { ProductDialog } from 'src/app/dialogs/product-dialog/product-dialog.component';

interface myObj {
  hover: boolean;
  planted: boolean;

}

@Component({
  selector: 'single-garden',
  templateUrl: 'single-garden.component.html',
  styleUrls: ['./single-garden.component.scss']

})

export class SingleGarden {

  gardenInView: JSON[];
  gardenName: string = '';
  gardenFreeSpace: number;
  gardenWaterLevel: number;
  gardenTemperature: number;
  gardenOccSpace: number;

  garden: Object = null;

  hover: myObj[][];
  width: number;
  height: number;

  constructor(private http: HttpService,
    private router: Router,
    private gardenService: GardenService,
    private dialog: MatDialog,
  ) {

    this.gardenService.getGardenForDisplaying().subscribe(result => {
      if(result){
        var dummy1 = Object.values(result);
        var res = Object.values(dummy1[0]);
        this.garden = res;
  
        this.gardenInView = res[4];
  
        console.log(this.gardenInView);
  
        this.width = res[2];
        this.height = res[3];
        this.gardenName = res[0];
        this.gardenFreeSpace = res[7];
        this.gardenTemperature = res[6];
        this.gardenWaterLevel = res[5];
        this.gardenOccSpace = this.width * this.height - this.gardenFreeSpace;
  
        //init matrix of boolean for every plant in garden
        //that shows is it hovered or not
        this.hover = [];
  
        for (var i: number = 0; i < this.width; i++) {
          this.hover[i] = [];
          for (var j: number = 0; j < this.height; j++) {
            this.hover[i][j] = { hover: false, planted: this.gardenInView[i][j].state == -1 ? false : true };
          }
        }
  
  
        let now = new Date();
        let update = false;
        //updating matrix by time;
        for (let i in this.gardenInView) {
          for (let j in this.gardenInView) {
            if (this.gardenInView[i][j].state != -1) {
              let time = new Date(this.gardenInView[i][j].planted);
              if ((now.getTime() - time.getTime()) / 1000 / 60 / 60 > 1) {
                update = true;
                this.gardenInView[i][j].state += Math.floor((now.getTime() - time.getTime()) / 1000 /60/60);
  
              }
  
            }
          }
  
        }
        if (update) {
          this.gardenService.updateGarden({ garden: this.gardenInView, name: this.gardenName }).subscribe();
        }
      }
   

    });



  }


  hoverPlant(obj) {

    //we have garden name and exact plant that is being hovered so we
    //can send requests to server to update that exact plant

    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);
    this.hover[i][j].hover = true;

  }

  unhoverPlant(obj) {

    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);
    this.hover[i][j].hover = false;

  }

  hovering(obj): boolean {

    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);

    return this.hover[i][j].hover;
  }

  isForbidden(obj):boolean{
    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);

    let date = new Date();
   
    if (obj.takenOut) {
      let takenOut = new Date(obj.takenOut);
      let canTakeOut = ((date.getTime() - takenOut.getTime()) / 1000 / 60 / 60) > 24;
    
      return !this.hover[i][j].planted && !canTakeOut;
    } else {
      return false;
    }


  }

  isPlanted(obj): boolean {

    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);

    let date = new Date();
   
    if (obj.takenOut) {
      let takenOut = new Date(obj.takenOut);
      let canTakeOut = ((date.getTime() - takenOut.getTime()) / 1000 / 60 / 60) > 24;
    
      return this.hover[i][j].planted || !canTakeOut;
    } else {
      return this.hover[i][j].planted;
    }



  }

 

  canImprove(obj){
    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);

    let date = new Date();
    if (obj.takenOut) {
      let takenOut = new Date(obj.takenOut);
      let canTakeOut = ((date.getTime() - takenOut.getTime()) / 1000 / 60 / 60) > 24;
    
      return this.hover[i][j].planted && !canTakeOut &&(this.gardenInView[i][j].state <100);
    } else {
      return this.hover[i][j].planted &&(this.gardenInView[i][j].state <100);
    }
  }

  toTakeOut(obj): boolean {

    return obj.state >= 100 ;
  }

  detectPhase(obj): string {
    if (obj.state == -1) {
      return "5"
    };

    var state = parseInt(obj.state);
    if (state == 0) {
      return "0"
    } else if (state < 33) return "1";
    else if (state < 66) return "2";
    else return "3";
  }

  plant(obj) {
    var req = { name: this.gardenName, x: parseInt(obj.x), y: parseInt(obj.y), producer: null, plantName: null };
    this.openDialog().subscribe(result => {

      if (result) {
        req.plantName = JSON.parse(JSON.stringify(result)).name;
        req.producer = JSON.parse(JSON.stringify(result)).producer;
        this.gardenService.plant(req).subscribe(result => {

          this.gardenInView[req.x][req.y].name = req.plantName;
          this.gardenInView[req.x][req.y].state = 0;
          this.gardenInView[req.x][req.y].producer = req.producer;
          this.hover[req.x][req.y].planted = true;
          this.gardenFreeSpace--;
          this.gardenOccSpace++;

          //this.gardenService.getGardenForDisplaying(result);
        })
      }

    })


  }

  takeOut(obj) {
    var req = { name: this.gardenName, x: parseInt(obj.x), y: parseInt(obj.y) };
    this.hover[req.x][req.y].planted = false;
    let date = new Date();

    this.gardenService.takeOut(req).subscribe(result => {
      this.gardenInView[req.x][req.y].state = -1;
      this.gardenInView[req.x][req.y].name = "";
      this.gardenInView[req.x][req.y].producer = "";
      this.gardenInView[req.x][req.y].takenOut = date;
      this.gardenFreeSpace++;
      this.gardenOccSpace--;

    })

  }

  addWater() {

    this.gardenService.addWater(this.gardenName).subscribe(result => {
      this.gardenWaterLevel++;
    });

  }

  removeWater() {

    this.gardenService.removeWater(this.gardenName).subscribe(result => {
      this.gardenWaterLevel--;
    });

  }

  raiseTemp() {
    this.gardenService.raiseTemp(this.gardenName).subscribe(result => {
      this.gardenTemperature++;
    });
  }

  lowerTemp() {
    this.gardenService.lowerTemp(this.gardenName).subscribe(result => {
      this.gardenTemperature--;
    });

  }

  useProduct(element) {
    this.openDialog2().subscribe(result => {
      if (result) {
        result.garden = this.gardenName;
        result.height = this.height;
        result.width = this.width;

        let properties = result.properties ? result.properties : 1;
        let i = element.x;
        let j = element.y;

        this.gardenInView[i][j].state += properties;
        if(this.gardenInView[i][j].state >100){
          this.gardenInView[i][j].state=100;
        }
      
        result.i = i;
        result.j = j;
        result.increment = properties;
        
        this.gardenService.useProduct(result).subscribe(result => {

        })
      }

    })
  }

  openDialog(): Observable<string> {

    console.log("opening dialog");

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(PlantDialog, dialogConfig);

    return dialogRef.afterClosed();
  }

  openDialog2(): Observable<any> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ProductDialog, dialogConfig);
    return dialogRef.afterClosed();
  }





}
