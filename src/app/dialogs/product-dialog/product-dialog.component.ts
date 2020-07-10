import { Component, OnInit, Inject } from '@angular/core';
import { ButtonService } from 'src/app/services/logged-service/logged-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http-service/http-service';

interface Product{
  name : string,
  quantity : number, 
  properties : number,
  producer : string
}

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialog  {

    //plant : Plant;
    product : Product;
    products : Object[];

    
    empty :boolean = false;

    displayedColumns = ['ime',  'svojstva','proizvodjac', 'izaberi'];

    constructor(
        private buttonService : ButtonService,
        private dialogRef: MatDialogRef<ProductDialog>,
        private http : HttpService,
        @Inject(MAT_DIALOG_DATA) data) {

            this.http.getWarehouse().subscribe(result=>{
                console.log(result)
                if(Object.keys(result).length !== 0){
                    
                    let filt = result.warehouse.filter(x => x.type == "chemical" && x.quantity !=0);
                    console.log(filt);
                    this.products = filt;
                    if(filt.length>0){
                        this.empty = false;
                    }else {
                        this.empty = true;
                    }
                   
                } else {
                    this.empty = true;
                }
             
            })
        }
    chooseProduct(obj){
        this.product = obj as Product;
        console.log(obj);
    }


    close() {
        this.dialogRef.close();
    }
    //save gets obj that represents plant
    //we need to make a 
    save(obj){
        if(this.product == null) {
            this.close();
        }
        console.log("ovo ste izavrali");
        console.log(obj);
        console.log(this.product);

        this.dialogRef.close(this.product);
    }
    

}
