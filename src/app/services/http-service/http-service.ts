import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';

import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import { AttachSession } from 'protractor/built/driverProviders';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { };



    private currUser: string = '';
    private currUsername : string = '';

    private userInfo : Object;

    private loginRoute = "/api/login";
    private logoutRoute = "/api/logout";
    private registerRoute = "/api/register";
    private userRoute = "/api/user";
    private warehouseRoute = "/api/user/warehouse";
    private validateTokenRoute = "/api/validate/token";
    private getFooterInfoRoute = "/api/user/footer";
    private changePasswordRoute = "/api/user/change/password";

    isLogged(): Observable<any> {

        return this.http.get<any>("/api/boot");
    }
    // Method retrieve all the posts
    login(user: string, pass: string): Observable<any> {


        let name = { user: user, pass: pass };
        return this.http.post<any>(this.loginRoute, name);
    }

    setUser(obj) {

        this.currUser = obj.type;
        this.currUsername = obj.username;
        this.userInfo = obj.user;
        console.log(obj);
        localStorage.setItem('user', JSON.stringify(obj.user));
        console.log(obj);
    }

    getUser(): string {
        let user =JSON.parse(localStorage.getItem('user'));
        
        if(user){
            return user.username;
        } else {
            return "";
        }
        
    }

    getUserInfo():any{
        let user = JSON.parse(localStorage.getItem('user'));
        return user;
    }

    logout(): Observable<any> {
        this.currUser = '';
        localStorage.removeItem('user');
        return this.http.put<any>(this.logoutRoute, null);
    }

    register(user: User): Observable<any> {
        return this.http.put<User>(this.registerRoute, user);

    }
    getUserData(): Observable<any> {
        return this.http.get<any>(this.userRoute);
    }

   

    getWarehouse():Observable<any> {
        return this.http.put(this.warehouseRoute, null);
    }

    validateToken(token):Observable<any>{
        return this.http.post(this.validateTokenRoute,{token : token});
    }

    getFooterInfo():Observable<any>{
        return this.http.post(this.getFooterInfoRoute, null);
    }




    

}

