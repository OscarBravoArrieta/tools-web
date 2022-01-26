 import { environment } from 'src/environments/environment';
 import { HttpClient, HttpHeaders } from '@angular/common/http'
 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

     headers = new HttpHeaders({
         'x-access-token': this.getToken(),
     });

     public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggIn());

     constructor(private http: HttpClient,  private router: Router) {}
     // -----------------------------------------------------------------------------------------------
     getDataForUser(id_number: any): any{
         return this.http.post(`${environment.serverUrl}/api/auth/getDataForUser/`, id_number );
     }
     // -----------------------------------------------------------------------------------------------
     signUp(newUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signUp/`, newUser);
     }
     // -----------------------------------------------------------------------------------------------
     verifyTokenFromEmail(token: any): any {

         return this.http.get(`${environment.serverUrl}/api/auth/verifyTokenFromEmail/${token}`);
     }
     // -----------------------------------------------------------------------------------------------
     signIn(loginUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signIn/`, loginUser);
     }
     // -----------------------------------------------------------------------------------------------
     resetPassword(user: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/resetPassword/`, user);
     }
     // -----------------------------------------------------------------------------------------------
     verifyTokenToRestorePassword(token: any): any {

         return this.http.get(`${environment.serverUrl}/api/auth/verifyTokenToRestorePassword/${token}`);
     }
     // -----------------------------------------------------------------------------------------------
     updatePassword(id: any, password: any): any {
         return this.http.put( `${environment.serverUrl}/api/auth/updatePassword/${id}`, password)
     }
     // -----------------------------------------------------------------------------------------------
     changePassword(id: any, password: any): any {
         return this.http.put( `${environment.serverUrl}/api/auth/changePassword/${id}`, password, {headers: this.headers})
     }
     // -----------------------------------------------------------------------------------------------

     loggIn(): any {
         //alert (!!localStorage.getItem('toolsToken'))
         return !!localStorage.getItem('toolsToken');
     }
     // -----------------------------------------------------------------------------------------------
     getToken(): any{
         return localStorage.getItem('toolsToken');
     }
     // -----------------------------------------------------------------------------------------------
     getCurrentId(): any {
         return localStorage.getItem('toolsCurrentUser');
     }
     // -----------------------------------------------------------------------------------------------
     logout(): any {

         localStorage.removeItem('toolsToken');
         localStorage.removeItem('toolsCurrentUser');
         localStorage.removeItem('currentEmployer');
         localStorage.removeItem('currentEmployee');
         localStorage.removeItem('currentIdEmployee');
         localStorage.removeItem('currentIdEmployer');
         localStorage.removeItem('currentBeneficiarie');
         localStorage.removeItem('currentIdBeneficiarie');
         localStorage.removeItem('userName');



         this.router.navigate([''])
         .then(() => {
             window.location.reload();
         });


     }
     // -----------------------------------------------------------------------------------------------

}
