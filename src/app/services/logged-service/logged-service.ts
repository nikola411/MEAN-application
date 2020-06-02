import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn : 'root'
})
export class ButtonService{
    private subject = new Subject<any>();

    getInfo(){
        return this.subject.next();
    }

    setInfo(){
        return this.subject.next(true);
    }

    clearInfo(){
        return this.subject.next(false);
    }

    onEvent(){ 
        return this.subject.asObservable();
    }

    registerGarden(){
        return this.subject.next("garden");
    }

    showGardens(obj){
        return this.subject.next(obj);
    }
    
    deleteGarden(obj:boolean){
        return obj;
    }

    refresh(){
        return;
    }
}