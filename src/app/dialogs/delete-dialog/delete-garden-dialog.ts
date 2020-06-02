import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonService } from '../../services/logged-service/logged-service';
import { Inject } from '@angular/core';  


@Component ({
    selector: 'garden-dialog',
    templateUrl: 'delete-garden.component.html',
    styleUrls: ['./delete-garden.component.scss']
})

export class DeleteDialog {

    constructor(
        private buttonService : ButtonService,
        private dialogRef: MatDialogRef<DeleteDialog>,
        @Inject(MAT_DIALOG_DATA) data) {}
    



    close() {
        this.dialogRef.close();
    }
    save(obj){
        this.dialogRef.close(obj);
    }


 

    
    
}

