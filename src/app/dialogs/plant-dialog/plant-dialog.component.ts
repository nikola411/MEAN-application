import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonService } from '../../services/logged-service/logged-service';
import { Inject } from '@angular/core';  
import { HttpService } from 'src/app/services/http-service/http-service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

interface Plant {
    type : string;
    name : string;
    producer : string;
    quantity : number;
}


@Component ({
    selector: 'plant-dialog',
    templateUrl: 'plant-dialog.component.html',
    styleUrls: ['./plant-dialog.component.css']
})


export class PlantDialog {

    plant : Plant;
    plants : Object[];
    empty :boolean = false;

    displayedColumns = ['ime', 'kolicina', 'proizvodjac', 'izaberi'];

    constructor(
        private buttonService : ButtonService,
        private dialogRef: MatDialogRef<PlantDialog>,
        private http : HttpService,
        @Inject(MAT_DIALOG_DATA) data) {

            this.http.getWarehouse().subscribe(result=>{
                if(Object.keys(result).length !== 0){
                    
                    let filt = result.warehouse.filter(x => x.type == "plant" && x.quantity !=0);
                    this.plants = filt;
                    this.empty = false;
                } else {
                    this.empty = true;
                }
             
            })
        }
    choosePlant(obj){
        this.plant = obj as Plant;
        console.log(obj);
    }


    close() {
        this.dialogRef.close();
    }
    //save gets obj that represents plant
    //we need to make a 
    save(obj){
        if(this.plant == null) {
            this.close();
        }
        console.log("ovo ste izavrali");
        console.log(obj);
        console.log(this.plant);

        this.dialogRef.close(this.plant);
    }
    
}
