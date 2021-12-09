 import { environment } from 'src/environments/environment';
 import { HttpClient, HttpHeaders } from '@angular/common/http'
 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
     headers = new HttpHeaders({
         'x-access-token': this.getToken(),
     });

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
     signIn(loginUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signIn/`, loginUser);
     }
     // -----------------------------------------------------------------------------------------------
     loggIn(): any {
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
         window.location.reload();
         this.router.navigate(['']);

     }
     // -----------------------------------------------------------------------------------------------

}
