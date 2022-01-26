 import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
 import { HttpClient, HttpHeaders } from '@angular/common/http'
 import { AuthService } from './auth.service';

 @Injectable({
      providedIn: 'root'
 })
 export class EmployeesService {

     headers = new HttpHeaders({
         'x-access-token': this.authServce.getToken(),
     });


     constructor(private http: HttpClient, private authServce: AuthService) { }
     //--------------------------------------------------------------------------------------------
     getEmployees(filter: any): any{
         return this.http.put( `${environment.serverUrl}/api/employees/`, filter, {headers: this.headers});
     }
     //--------------------------------------------------------------------------------------------
     getBeneficiariesEmployee(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employees/getBeneficiariesEmployee/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getPayrollHistory(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employees/getPayrollHistory/`, filter);
     }
    // --------------------------------------------------------------------------------------------
    getPayrollHistoryUp(filter: any) {
      return this.http.put( `${environment.serverUrl}/api/employees/getPayrollHistoryUp/`, filter);
     }
    // --------------------------------------------------------------------------------------------
    getMonetarySubsidy(filter: any) {
         return this.http.put( `${environment.serverUrl}/api/employees/getMonetarySubsidy/`, filter);
     }
     // --------------------------------------------------------------------------------------------
     getEmployeesToCheckStatus(valuesToConsult: any) {
       return this.http.put( `${environment.serverUrl}/api/employees/getEmployeesToCheckStatus/`, valuesToConsult, {headers: this.headers});
     }
     // --------------------------------------------------------------------------------------------
     updateEmployeesStatus(parameters: any) {
         return this.http.put( `${environment.serverUrl}/api/employees/updateEmployeesStatus/`, parameters, {headers: this.headers});
    }
    // --------------------------------------------------------------------------------------------

}
