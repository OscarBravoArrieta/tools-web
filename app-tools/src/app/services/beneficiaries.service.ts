 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
 import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
 import { AuthService } from './auth.service';


 @Injectable({
     providedIn: 'root'
 })
 export class BeneficiariesService {
      headers = new HttpHeaders({
         'x-access-token': this.authServce.getToken(),
      });


     constructor(private http: HttpClient,
                 private authServce: AuthService ) { }
      //--------------------------------------------------------------------------------------------
      getOne(parameters: any): any{
          return this.http.put(`${environment.serverUrl}/api/beneficiaries/getOne`, parameters, {headers: this.headers});
      }
     //--------------------------------------------------------------------------------------------
     getBeneficiaries(filter: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/`, filter, {headers: this.headers});
     }
     //--------------------------------------------------------------------------------------------
     getBeneficiaryMonetarySubsidy(filter: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/beneficiaryMonetarySubsidy/`, filter);
     }
    //--------------------------------------------------------------------------------------------
     getBeneficiariesToCheckStatus(valuesToConsult: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/getBeneficiariesToCheckStatus/`, valuesToConsult, {headers: this.headers});
     }
    //--------------------------------------------------------------------------------------------
     getSpousesToCheckStatus(parameters: any): any{
         return this.http.put(`${environment.serverUrl}/api/beneficiaries/getSpousesToCheckStatus/`, parameters, {headers: this.headers});
     }
   //--------------------------------------------------------------------------------------------
    updateBeneficiariesStatus(parameters: any): any{
       return this.http.put(`${environment.serverUrl}/api/beneficiaries/updateBeneficiariesStatus/`, parameters, {headers: this.headers});
    }
    //--------------------------------------------------------------------------------------------



 }
