import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUsersRoute = "/api/admin/users";
  adminRequestsRoute = "/api/admin/requests";
  adminUsersRemoveRoute = "/api/admin/users/remove";
  adminRequestsConfirmRoute = "/api/admin/requests/confirm";
  adminRequestRemoveRoute = "/api/admin/requests/remove";
  adminPromoteUserRoute = "/api/admin/users/promote";

  constructor(private http: HttpClient) { }


  showUsers(): Observable<any> {
    return this.http.post(this.adminUsersRoute, null);
  }

  removeUser(user): Observable<any> {
    return this.http.post(this.adminUsersRemoveRoute, user);
  }

  showRequests(): Observable<any> {
    return this.http.post(this.adminRequestsRoute, null);
  }

  confirmRequest(elem): Observable<any> {
    return this.http.post(this.adminRequestsConfirmRoute, { user: elem.username });
  }

  removeRequest(elem): Observable<any> {
    return this.http.post(this.adminRequestRemoveRoute, elem);
  }

  promoteUser(username) : Observable<any>{
    return this.http.post(this.adminPromoteUserRoute, username);
  }


}
