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
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { };

    currUser: string = '';

    loginRoute = "/api/login";
    logoutRoute = "/api/logout";
    registerRoute = "/api/register";
    userRoute = "/api/user";
    addGardenRoute = "/api/user/addgarden";
    showGardensRoute = "/api/user/gardens";
    showGardenRoute = "/api/user/showgarden";
    removeGardenRoute = "/api/user/delete/garden";

    plantInGardenRoute = "/api/user/garden/plant";
    plantTakeOutRoute = "/api/user/garden/take-out";
    
    addWaterRoute = "/api/user/garden/add/water";
    removeWaterRoute = "/api/user/garden/remove/water";
    raiseTempRoute = "/api/user/garden/raise/temp";
    lowerTempRoute = "/api/user/garden/lower/temp";

    warehouseRoute = "/api/user/warehouse";

    validateTokenRoute = "/api/validate/token";

    ordersRoute = "/api/company/orders";
    productsRoute = "/api/company/products";
    addProductRoute = "/api/company/product/add";
    removeProductRoute = "/api/company/product/remove";

    shopRoute = "/api/shop";

    adminUsersRoute = "/api/admin/users";
    adminRequestsRoute = "/api/admin/requests";
    adminUsersRemoveRoute = "/api/admin/users/remove";
    adminRequestsConfirmRoute = "/api/admin/requests/confirm";
    


    isLogged(): Observable<any> {

        return this.http.get<any>("/api/boot");
    }
    // Method retrieve all the posts
    login(user: string, pass: string): Observable<any> {


        let name = { user: user, pass: pass };
        return this.http.post<any>(this.loginRoute, name);
    }

    setUser(str: string) {
        this.currUser = str;
    }

    getUser(): string {
        return this.currUser;
    }

    logout(): Observable<any> {
        this.currUser = '';
        return this.http.put<any>(this.logoutRoute, null);
    }

    register(user: User): Observable<any> {
        return this.http.put<User>(this.registerRoute, user);

    }
    getUserData(): Observable<any> {
        return this.http.get<any>(this.userRoute);
    }

    addGarden(obj: any) {
        console.log("adding garden");
        return this.http.post(this.addGardenRoute, obj);
    }

    showMyGarden(obj: any): Observable<any> {
        return this.http.post(this.showGardenRoute, obj);
    }

    showGardens(): Observable<any> {
        return this.http.get(this.showGardensRoute);
    }

    removeGarden(obj): Observable<any> {
        console.log(obj);
        return this.http.post(this.removeGardenRoute, obj);
        
    }

    plant(obj): Observable<any> {
        return this.http.post(this.plantInGardenRoute, obj);
    }

    takeOut(obj):Observable<any>{
        return this.http.post(this.plantTakeOutRoute, obj);
    }

    addWater(gardenName) : Observable<any> {
        console.log(gardenName);
        return this.http.post(this.addWaterRoute, {name : gardenName});

    }

    removeWater(gardenName): Observable<any> {

        return this.http.post(this.removeWaterRoute, {name : gardenName});

    }

    raiseTemp(gardenName) : Observable<any> {

        return this.http.post(this.raiseTempRoute, {name : gardenName});

    }

    lowerTemp(gardenName) : Observable<any> {

        return this.http.post(this.lowerTempRoute, {name : gardenName});

    }

    getWarehouse():Observable<any> {
        return this.http.put(this.warehouseRoute, null);
    }

    validateToken(token):Observable<any>{
        return this.http.post(this.validateTokenRoute,{token : token});
    }


    getCompanyOrders():Observable<any>{
        return this.http.post(this.ordersRoute, null);
    }

    getCompanyProducts() : Observable<any>{
        return this.http.post(this.productsRoute, null);
    }

    addProduct(product):Observable<any>{
        return this.http.post(this.addProductRoute, product);
    }

    removeProduct(product) : Observable<any>{
        return this.http.post(this.removeProductRoute, product);
    }



    shop():Observable<any>{
        return this.http.post(this.shopRoute, null);
    }

    showUsers():Observable<any>{
        return this.http.post(this.adminUsersRoute, null);
    }

    removeUser(user):Observable<any>{
        return this.http.post(this.adminUsersRemoveRoute, user);
    }

    showRequests():Observable<any>{
        return this.http.post(this.adminRequestsRoute, null);
    }

    confirmRequest(elem):Observable<any>{
        return this.http.post(this.adminRequestsConfirmRoute, {user : elem.username});
    }


    // This method parses the data to JSON
    private parseData(res: Response) {
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

