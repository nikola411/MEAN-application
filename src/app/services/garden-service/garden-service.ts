import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn : 'root'
})
export class GardenService{
    

    addGardenRoute = "/api/user/gardens/add";
    showGardensRoute = "/api/user/gardens";
    showGardenRoute = "/api/user/garden/show";
    removeGardenRoute = "/api/user/delete/garden";

    plantInGardenRoute = "/api/user/garden/plant";
    plantTakeOutRoute = "/api/user/garden/take-out";

    addWaterRoute = "/api/user/garden/add/water";
    removeWaterRoute = "/api/user/garden/remove/water";
    raiseTempRoute = "/api/user/garden/raise/temp";
    lowerTempRoute = "/api/user/garden/lower/temp";

    useProductRoute = "/api/user/garden/product/use";

    updateGardenRoute = "/api/user/garden/update";

    firstCheckGardensUpdateRoute = "/api/user/gardens/update/first";
    updateConditionsRoute = "/api/user/gardens/update/conditions";


    private garden : any;

    constructor(private http : HttpClient){}

    getGardenForDisplaying() : Observable<any>{
        console.log("saljem objekat dalje");
       return this.http.post(this.showGardenRoute, this.garden);
    }

    setGarden(gard){
        this.garden = gard;
        console.log(gard);
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

    useProduct(product):Observable<any>{
        return this.http.put(this.useProductRoute, product);
    }

    updateGarden(garden):Observable<any>{
        return this.http.post(this.updateGardenRoute, garden);
    }

    firstCheck(time):Observable<any>{
        return this.http.post(this.firstCheckGardensUpdateRoute, time);
    }

    updateGardensConditions(update) : Observable<any>{
        return this.http.post(this.updateConditionsRoute, update );
    }


 
    



}