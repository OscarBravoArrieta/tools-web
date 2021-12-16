 import { environment } from 'src/environments/environment';
 import { Injectable } from '@angular/core';
 import { AuthService } from './auth.service';
 import { HttpClient, HttpHeaders } from '@angular/common/http'

 @Injectable({
      providedIn: 'root'
 })
 export class EmployersService {
     headers = new HttpHeaders({
       'x-access-token': this.authServce.getToken(),
     });
     constructor(private http: HttpClient,
                private authServce: AuthService) { }
    // --------------------------------------------------------------------------------------------
     getEmployers(filter: any): any{

         return this.http.put( `${environment.serverUrl}/api/employers/`, filter, {headers: this.headers});
     }
     // --------------------------------------------------------------------------------------------
     getEmployeesEmployer(filter: any): any { //Get All active employees from a emloyer

         return this.http.put( `${environment.serverUrl}/api/employers/getEmployeesEmployer/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getBeneficiariesEmployer(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employers/getBeneficiariesEmployer/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getPaymentsEmployer(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employers/getPaymentsEmployer/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getPayrollEmployer(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employers/getPayrollEmployer/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getEmployersToCheckStatus(valuesToConsult: any) {
         return this.http.put( `${environment.serverUrl}/api/employers/getEmployersToCheckStatus/`, valuesToConsult, {headers: this.headers});
     }
     // --------------------------------------------------------------------------------------------
    updateEmployerStatus(parameters: any) {
         //console.log(parameters)
         return this.http.post(`${environment.serverUrl}/api/employers/updateEmployerStatus/`, parameters, {headers: this.headers});
     }
     // --------------------------------------------------------------------------------------------

 }
