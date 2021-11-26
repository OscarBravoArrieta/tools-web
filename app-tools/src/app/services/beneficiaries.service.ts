 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';


 @Injectable({
     providedIn: 'root'
 })
 export class BeneficiariesService {

     constructor(private http: HttpClient) { }
     //--------------------------------------------------------------------------------------------
     getBeneficiaries(filter: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/`, filter);
     }
     //--------------------------------------------------------------------------------------------
     getBeneficiaryMonetarySubsidy(filter: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/beneficiaryMonetarySubsidy/`, filter);
     }
    //--------------------------------------------------------------------------------------------
     getBeneficiariesToCheckStatus(valuesToConsult: any): any{
        return this.http.put(`${environment.serverUrl}/api/beneficiaries/getBeneficiariesToCheckStatus/`, valuesToConsult);
     }
    //--------------------------------------------------------------------------------------------
     getSpousesToCheckStatus(valuesToConsult: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/getSpousesToCheckStatus/`, valuesToConsult);
     }
   //--------------------------------------------------------------------------------------------
    updateBeneficiariesStatus(parameters: any): any{
       return this.http.put(`${environment.serverUrl}/api/beneficiaries/updateBeneficiariesStatus/`, parameters);
    }
    //--------------------------------------------------------------------------------------------



 }
