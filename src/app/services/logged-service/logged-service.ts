import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { userInfo } from 'os';


@Injectable({
    providedIn : 'root'
})
export class ButtonService{
    private subject = new Subject<any>();

    getInfo(){
        return this.subject.next();
    }

    setInfo(user){
        return this.subject.next({user: user, status : true});
    }

    clearInfo(user){
        return this.subject.next({user : user, status : false});
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

    sendProducts(obj, user){
        return this.subject.next({user : user, status : true, products :obj});
    }
    
    deleteGarden(obj:boolean){
        return obj;
    }

    refresh(){
        return;
    }
}