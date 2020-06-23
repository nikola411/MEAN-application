import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpService } from '../services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonService } from './../services/logged-service/logged-service';
import { UserMenu } from '../menu/user-menu/user-menu.component';
import { GardenService } from '../services/garden-service/garden-service';


@Component({
    selector: 'garden-form',
    templateUrl: 'garden-form.component.html',
    styleUrls: ['./garden-form.component.scss']

})
export class GardenForm {

    nameForm = new FormControl();
    placeForm = new FormControl();
    plantsForm = new FormControl();
    freeForm = new FormControl();
    waterForm = new FormControl();
    tempsForm = new FormControl();

    constructor(private http: HttpService, private router: Router,
        private route: ActivatedRoute, private buttonService: ButtonService,
        private gardenService : GardenService) {
           
         }

    addGarden() {
        let newGarden = {
            name: this.nameForm.value,
            place: this.placeForm.value,
            height: this.plantsForm.value,
            width: this.freeForm.value,
            garden : null
        }
        /*newGarden.garden = new Array(newGarden.height);
        for(var i ;i<newGarden.height;i++){
            newGarden.garden[newGarden.height] = new Array(newGarden.width);
        }*/

        this.http.addGarden(newGarden).subscribe(result=>{
            this.gardenService.showGardens(result);
        });
        this.router.navigate(['user/garden/show/all', {relativeTo : this.route}]);
    }
}

