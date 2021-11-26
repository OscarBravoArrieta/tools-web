 import { environment } from 'src/environments/environment';
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http'

 @Injectable({
      providedIn: 'root'
 })
 export class EmployersService {
     constructor(private http: HttpClient) { }
    // --------------------------------------------------------------------------------------------
     getEmployers(filter: any): any{
         return this.http.put( `${environment.serverUrl}/api/employers/`, filter);
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
         return this.http.put( `${environment.serverUrl}/api/employers/getEmployersToCheckStatus/`, valuesToConsult);
     }
     // --------------------------------------------------------------------------------------------
    updateEmployerStatus(parameters: any) {
         //console.log(parameters)
         return this.http.post(`${environment.serverUrl}/api/employers/updateEmployerStatus/`, parameters);
     }
     // --------------------------------------------------------------------------------------------

 }
