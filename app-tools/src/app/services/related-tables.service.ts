 import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
 import { HttpClient } from '@angular/common/http'

 @Injectable({
      providedIn: 'root'
 })
 export class RelatedTablesService {

     constructor(private http: HttpClient) { }
     // --------------------------------------------------------------------------------------------
     getReasonsForInactivation(filter: any):any {

         return this.http.put( `${environment.serverUrl}/api/relatedTables/reason-for-inactivation/`, {filter: filter});
     }

     // --------------------------------------------------------------------------------------------
}
