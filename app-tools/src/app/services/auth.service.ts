 import { environment } from 'src/environments/environment';
 import { HttpClient } from '@angular/common/http'
 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

     constructor(private http: HttpClient) { }
     // --------------------------------------------------------------------------------------------
     signIn(parameters: any): any{
         return this.http.post(`${environment.serverUrl}/api/auth/signup/`, parameters);
     }
     // -----------------------------------------------------------------------------------------------
     getDataForUser(idEmployee: any): any{
         return this.http.post(`${environment.serverUrl}/api/auth/getDataForUser/`, idEmployee);
     }

     signUp(newUser: any): any {
         return this.http.post(`${environment.serverUrl}/api/auth/signUp/`, newUser);
     }

}
