 import { environment } from 'src/environments/environment';
 import { HttpClient } from '@angular/common/http'
 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

     constructor(private http: HttpClient) { }
     // -----------------------------------------------------------------------------------------------
     getDataForUser(idEmployee: any): any{
         return this.http.post(`${environment.serverUrl}/api/auth/getDataForUser/`, idEmployee);
     }

     signUp(newUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signUp/`, newUser);
     }
     // -----------------------------------------------------------------------------------------------
     signIn(loginUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signIn/`, loginUser);
     }
     // -----------------------------------------------------------------------------------------------

}
