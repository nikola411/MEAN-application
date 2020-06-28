import { Component, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { FormControl, Validators } from '@angular/forms';
import { finished } from 'stream';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
    selector: 'users',
    templateUrl:'users.component.html' , 
    styleUrls : ['./users.component.scss']
    
  })
  export class Users {

    @ViewChild(MatTable) table : MatTable<any>;
      
    users : any[];
    tableSource = new MatTableDataSource<any>();
    displayedColumns = ['id', 'username', 'email', 'type', 'options'];

    constructor(private http : HttpService, private adminService : AdminService){
        this.adminService.showUsers().subscribe(result=>{
            this.users = result;
            this.tableSource.data = this.users;
            console.log(this.users);
        })
    }

    removeUser(elem){
        console.log("removing user");
        console.log(elem);
        this.adminService.removeUser({user : elem.username, email : elem.email}).subscribe(result=>{
            this.refresh();
        })
    }

    private refresh(){
        this.adminService.showUsers().subscribe(result=>{
            this.users = result;
            this.tableSource.data= this.users;
            this.table.renderRows();

        })
    }

  }
