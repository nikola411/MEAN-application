import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
    providedIn : 'root'
})
export class GardenService{
    private subject = new Subject<any>();

    onEvent(){ 
        return this.subject.asObservable();
    }

    registerGarden(){
        return this.subject.next("garden-form");
    }

    showGardens(){
        return this.subject.next();
    }

    getGardenForDisplaying(obj){
        console.log("saljem objekat dalje");
       return this.subject.next(obj);
    }
    



}