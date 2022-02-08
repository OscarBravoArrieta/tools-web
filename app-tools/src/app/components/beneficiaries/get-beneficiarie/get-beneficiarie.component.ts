 import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service'
 import { DatePipe } from '@angular/common'
 import { Router } from '@angular/router'

 @Component({
     selector: 'app-get-beneficiarie',
     templateUrl: './get-beneficiarie.component.html',
     styleUrls: ['./get-beneficiarie.component.css']
 })
 export class GetBeneficiarieComponent implements OnInit {
     @Output() idBeneficiarie = new EventEmitter<string>();
     results: any
     selectedBeneficiarie: string = ''
     beneficiaryType: String = 'B'

     constructor(
         public httpBeneficiaries: BeneficiariesService,
         private router: Router,
         public datepipe: DatePipe

     ) { }
      ngOnInit(): void {
         localStorage.setItem('beneficiaryType','HIJO')
      }
     // -------------------------------------------------------------------------------------------
     getAll(e:any):void{


         const filter = {filterName: e, forSearchHelp: true, beneficiaryType: this.beneficiaryType}
         this.httpBeneficiaries.getBeneficiaries(filter).subscribe((data: any) => {
             this.results = data.beneficiaries
             console.log(this.results);
         }, (err: any) => {
             this.router.navigate(['/signin'])
         })
     }
     // -------------------------------------------------------------------------------------------
     sendSelectedBeneficiarie(): void {
         this.idBeneficiarie.emit(this.selectedBeneficiarie);
     }
     // -------------------------------------------------------------------------------------------
     changeBeneficiaryType(){
         if(this.beneficiaryType == 'B'){
             localStorage.setItem('beneficiaryType','HIJO')
         } else {
             localStorage.setItem('beneficiaryType','CONYUGE')
         }

     }

}
