import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpService } from '../http-service/http-service';
import { ButtonService } from '../logged-service/logged-service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private httpService: HttpService, private router: Router, private buttonService :ButtonService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        var ret: boolean;
        var user = this.httpService.getUser();
        if (user == '/user') {
            if (next.routeConfig.path == "login" || next.routeConfig.path == "register") {
                ret = false;
            } else {
                ret = true;
            }
        } else {
            if (next.routeConfig.path == "login" || next.routeConfig.path == "register") {
                ret = true;
                this.buttonService.clearInfo();
                
            } else {
                ret = false;
                
                this.buttonService.setInfo();
            }
            
        }

        console.log(ret);
        return ret;

    }
}