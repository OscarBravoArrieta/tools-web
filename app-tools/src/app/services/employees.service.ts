 import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
 import { HttpClient } from '@angular/common/http'

 @Injectable({
      providedIn: 'root'
 })
 export class EmployeesService {

     constructor(private http: HttpClient) { }
     //--------------------------------------------------------------------------------------------
     getEmployees(filter: any): any{
         return this.http.put( `${environment.serverUrl}/api/employees/`, filter);
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
       return this.http.put( `${environment.serverUrl}/api/employees/getEmployeesToCheckStatus/`, valuesToConsult);
     }
     // --------------------------------------------------------------------------------------------
     updateEmployeesStatus(parameters: any) {
         return this.http.put( `${environment.serverUrl}/api/employees/updateEmployeesStatus/`, parameters);
    }
    // --------------------------------------------------------------------------------------------

}
