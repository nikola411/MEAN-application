import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { AttachSession } from 'protractor/built/driverProviders';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
    providedIn : 'root'
})
export class HttpService {
    constructor ( private http:HttpClient, private router : Router, private route:ActivatedRoute){};

    currUser : string = '';
    
    loginRoute = "/api/login";
    logoutRoute = "/api/logout";
    registerRoute = "/api/register";
    userRoute = "/api/user";
    addGardenRoute = "/api/user/addgarden";
    showGardensRoute = "/api/user/gardens";
    showGardenRoute = "/api/user/showgarden";
    removeGardenRoute = "/api/user/delete/garden";

    plantInGardenRoute = "/api/user/garden/plant";


    isLogged() : Observable<any> {
        
        return this.http.get<any>("/api/boot");
    }
    // Method retrieve all the posts
    login (user:string, pass:string):Observable<any> {

 
       let name = {user:user, pass : pass};
       return  this.http.post<any>(this.loginRoute, name);
    }

    setUser(str : string) {
        this.currUser = str;
    }

    getUser() : string {
        return this.currUser;
    }

    logout():Observable<any>{
        this.currUser = '';
        return this.http.put<any>(this.logoutRoute, null);
    }

    register(user : User):Observable<any>{
       return this.http.put<User>(this.registerRoute, user);
      
    }
    getUserData():Observable<any>{
        return this.http.get<any>(this.userRoute);
    }

    addGarden(obj: any){
        console.log("adding garden");
         return this.http.put(this.addGardenRoute, obj);
    }

    showMyGarden(obj : any):Observable<any>{
        return this.http.post(this.showGardenRoute,obj);
    }

    showGardens():Observable<any>{
        return this.http.get(this.showGardensRoute);
    }

    removeGarden(obj):Observable<any>{
        return this.http.post(this.removeGardenRoute, obj);
    }

    plant(obj):Observable<any>{
        return this.http.post(this.plantInGardenRoute, obj);
    }
   

    // This method parses the data to JSON
    private parseData(res: Response)  {
        return res.json() || [];
    }

    // Displays the error message
    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.message ? error.message : error.toString();

        // In real world application, call to log error to remote server
        // logError(error);

        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }
}
 
