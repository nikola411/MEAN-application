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

 
    
}