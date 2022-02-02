 import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { Router } from '@angular/router';

 @Component({
     selector: 'app-details-employer',
     templateUrl: './details-employer.component.html',
     styleUrls: ['./details-employer.component.css']
 })

 export class DetailsEmployerComponent implements OnInit, OnDestroy {

     currentEmployer: any
     idEmployer: String = ''
     constructor(
         public EmployersService: EmployersService
     ) { }
     // -----------------------------------------------------------------

     ngOnInit(): void {
         //localStorage.setItem('currentEmployer', '')
         this.getData()
     }
     // -----------------------------------------------------------------
     async getData() {
         this.currentEmployer = localStorage.getItem('currentEmployer')
         this.currentEmployer = JSON.parse(this.currentEmployer)




      //  const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
      //  await this.EmployersService.getOne(filter).toPromise().then((data: any) => {
      //      localStorage.setItem('currentEmployer', JSON.stringify(data.employer))
      //      this.currentEmployer = data.employer
      //      //localStorage.setItem('currentEmployer', JSON.stringify(this.currentEmployer))
      //  },(err: any) => {
      //   // if (!this.currentEmployer) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
      //   //    this.router.navigate(['/signin'])
      //  })

     }
     ngOnDestroy() {}

}
//
