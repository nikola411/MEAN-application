import { Component, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { FormControl, Validators } from '@angular/forms';
import { finished } from 'stream';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products-service/products-service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'requests',
    templateUrl:'requests.component.html' , 
    styleUrls : ['./requests.component.scss']
    
  })
  export class Requests {
      
    @ViewChild(MatTable) table : MatTable<any>;
      
    requests : any[];
    tableSource = new MatTableDataSource<any>();
    displayedColumns = ['id', 'username', 'email', 'type', 'options'];

    constructor(private http : HttpService){
        this.http.showRequests().subscribe(result=>{
            console.log(result)
            this.requests = result;
            this.tableSource.data = this.requests;
            
        })
    }

    removeRequest(elem){
        console.log("removing user");
        console.log(elem);
        //this.http.removeRequest({user : elem.username, email : elem.email}).subscribe(result=>{
     //      this.refresh();
      //  })
    }

    confirmRequest(elem){
        this.http.confirmRequest(elem).subscribe(result=>{
            this.refresh();
        });
    }

    private refresh(){
        this.http.showRequests().subscribe(result=>{
            console.log("refreshing");
            this.requests = result;
            this.tableSource.data= this.requests;
            this.table.renderRows();

        })
    }

  }
  