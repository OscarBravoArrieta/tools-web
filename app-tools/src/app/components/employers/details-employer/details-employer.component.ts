 import { Component, OnInit, Input, OnDestroy  } from '@angular/core';

 @Component({
     selector: 'app-details-employer',
     templateUrl: './details-employer.component.html',
     styleUrls: ['./details-employer.component.css']
 })

 export class DetailsEmployerComponent implements OnInit, OnDestroy {

     currentEmployer: any
     constructor() { }
     // -----------------------------------------------------------------

     ngOnInit(): void {
         this.currentEmployer = localStorage.getItem('currentEmployer')
         this.currentEmployer = JSON.parse(this.currentEmployer)
     }
     // -----------------------------------------------------------------
     ngOnDestroy() {}

}
//
