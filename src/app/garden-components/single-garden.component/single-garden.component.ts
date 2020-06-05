import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { Observable } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { GardenService } from '../../services/garden-service/garden-service';
import { DeleteDialog } from 'src/app/dialogs/delete-dialog/delete-garden-dialog';
import { Router } from '@angular/router';

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

  hover: myObj[][];
  width: number;
  height: number;



  constructor(private http: HttpService,
    private router: Router,
    private gardenService: GardenService,
    private dialog: MatDialog) {

    this.gardenService.onEvent().subscribe(res => {

      /* res is an object of format {0: {name : '',place : '', widht: '', height:'', garden:'', water:'', temp:'', free:''}}
      so dummy1 is an array of values of fields of res(only 0) and dummy2 is an array of values of dummy 1
      (length = 7)
      */


      var dummy1 = Object.values(res);
      var dummy2 = Object.values(dummy1[0]);

      this.gardenInView = dummy2[4];

      this.width = dummy2[2];
      this.height = dummy2[3];
      this.gardenName = dummy2[0];
      this.gardenFreeSpace = dummy2[7];
      this.gardenTemperature = dummy2[6];
      this.gardenWaterLevel = dummy2[5];

      //init matrix of boolean for every plant in garden
      //that shows is it hovered or not
      this.hover = [];

      for (var i: number = 0; i < this.width; i++) {
        this.hover[i] = [];
        for (var j: number = 0; j < this.height; j++) {
          this.hover[i][j] = { hover: false, planted: this.gardenInView[i][j].state == -1 ? false : true};
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

  isPlanted(obj): boolean {

    var i: number = parseInt(obj.x);
    var j: number = parseInt(obj.y);

    
    return this.hover[i][j].planted;

  }

  detectPhase(obj): string {
    if (obj.state == -1) {
      return "5"
    };

    var state = parseInt(obj.state);
    if (state == 0) {
      return "0"
    } else if (state < 0.33) return "1";
    else if (state < 0.66) return "2";
    else return "3";
  }

  plant(obj){
    console.log(obj);
    var req = {name : this.gardenName, garden : this.gardenInView, x : parseInt(obj.x), y : parseInt(obj.y)};
    this.hover[req.x][req.y].planted = true;
    this.http.plant(req).subscribe(result => {
     console.log(result.status.value.garden[0]);
    })
  }





}
