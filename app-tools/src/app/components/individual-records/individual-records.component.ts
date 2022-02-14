 import { Component, OnInit } from '@angular/core';
 import { DynamicDialogRef } from 'primeng/dynamicdialog';
 import { DialogService } from 'primeng/dynamicdialog';
 import { ConfirmationService, MessageService} from 'primeng/api';
 import { TabPageEmployersComponent } from '../employers/tab-page-employers/tab-page-employers.component';
 import { TabPageEmployeesComponent } from '../employees/tab-page-employees/tab-page-employees.component';
 import { TabPageBeneficiariesComponent } from '../beneficiaries/tab-page-beneficiaries/tab-page-beneficiaries.component';
 import { EmployersService } from 'src/app/services/employers.service';
 import { EmployeesService } from 'src/app/services/employees.service';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { Router } from '@angular/router';

 @Component({
     selector: 'app-individual-records',
     templateUrl: './individual-records.component.html',
     styleUrls: ['./individual-records.component.css'],
     providers: [DialogService, MessageService]
 })
 export class IndividualRecordsComponent implements OnInit {
     idEmployer: string = ''
     idEmployee: string = ''
     idBeneficiarie: string = ''
     currentEmployer: any
     currentEmployee: any
     currentBeneficiarie: any
     beneficiaryType: string = ''

     constructor(
         public httpEmployers: EmployersService,
         public employeesService: EmployeesService,
         public beneficiariesService: BeneficiariesService,
         public dialogService: DialogService,
         public router: Router,
         public messageService: MessageService,

     ) {}
     ref: DynamicDialogRef;

     ngOnInit(): void {

     }
     // -------------------------------------------------------------------------------------------
     getIdEmployer(e: string):void{
         this.idEmployer = e
         localStorage.setItem('currentIdEmployer', e)
     }
     // -------------------------------------------------------------------------------------------
     getIdEmployee(e: string): void {
         this.idEmployee = e
         localStorage.setItem('currentIdEmployee',e)
     }
     // -------------------------------------------------------------------------------------------
     getIdBeneficiarie(e: string): void {
         if (e){
             this.idBeneficiarie = e
             localStorage.setItem('currentIdBeneficiarie', this.idBeneficiarie)
         } else {
             alert('eMPTY')
             localStorage.removeItem('currentIdBeneficiarie')

         }
     }
  // -------------------------------------------------------------------------------------------
     async showEmployer() {
         if (this.idEmployer == ''){
             this.customToast('error', 'Error', 'Seleccione el empleador')
             return
         }

         await this.getDataEmployer()
         this.currentEmployer = localStorage.getItem('currentEmployer') || ''
         this.currentEmployer = JSON.parse(this.currentEmployer)
         let nameEmployer = 'Empleador: '+ this.currentEmployer[0].TIPO_IDENTIFICACION  + ' ' + this.currentEmployer[0].ID + '-' + this.currentEmployer[0].RAZON_SOCIAL

         this.ref = this.dialogService.open(TabPageEmployersComponent, {
             header: nameEmployer || 'Detalles de empleador',
             closable: true,
             width: '55%',
             contentStyle: {"max-height": "780px", "min-height": "780px", "overflow": "auto"},
             baseZIndex: 10000
         });
     }
     // -------------------------------------------------------------------------------------------
     async showEmployee() {
         if (this.idEmployee == ''){
             this.customToast('error', 'Error', 'Seleccione el trabajador')
             return
         }

       await this.getDataEmployee()
       this.currentEmployee = localStorage.getItem('currentEmployee') || ''
       this.currentEmployee = JSON.parse(this.currentEmployee)
       let nameEmployee = 'Empleado: ' + this.currentEmployee[0].TIPO_IDENTIFICACION  + ' ' + this.currentEmployee[0].ID_AFILIADO + '-' + this.currentEmployee[0].AFILIADO

       this.ref = this.dialogService.open(TabPageEmployeesComponent, {
           header: nameEmployee || 'Detalles de afiliado',
           closable: true,
           width: '55%',
           contentStyle: {"max-height": "780px", "min-height": "780px", "overflow": "auto"},
           baseZIndex: 10000
      });

  }
  // -------------------------------------------------------------------------------------------
  async showBeneficiarie() {
    if (this.idBeneficiarie == ''){
        this.customToast('error', 'Error', 'Seleccione el beneficiario')
        return
    }

  //await this.getDataBeneficiarie()
  this.currentBeneficiarie = localStorage.getItem('currentBeneficiarie') || ''
  this.currentBeneficiarie = JSON.parse(this.currentBeneficiarie)
  let nameBeneficiarie = 'Detalles del Beneficiario' //+ this.currentBeneficiarie[0].TIPO_ID_BENEFICIARIO  + ' ' + this.currentBeneficiarie[0].DOCUMENTO_BENEFICIARIO + '-' + this.currentBeneficiarie[0].BENEFICIARIO

  this.ref = this.dialogService.open(TabPageBeneficiariesComponent, {
      header: nameBeneficiarie || 'Detalles de beneficiario',
      closable: true,
      width: '55%',
      contentStyle: {"max-height": "780px", "min-height": "780px", "overflow": "auto"},
      baseZIndex: 10000
 });

}
// -------------------------------------------------------------------------------------------
     async getDataEmployer(){
         const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
         await this.httpEmployers.getOne(filter).toPromise().then((data: any) => {
             localStorage.setItem('currentEmployer', JSON.stringify(data.employer))
             this.currentEmployer = data.employer
             localStorage.setItem('currentEmployer', JSON.stringify(this.currentEmployer))
         },(err: any) => {
         if (!this.currentEmployer) {console.log('No ha iniciado sesión');}
             this.router.navigate(['/signin'])
         })
     }
     // -------------------------------------------------------------------------------------------
     async getDataEmployee(){
      const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
      await this.employeesService.getOne(filter).toPromise().then((data: any) => {
          localStorage.setItem('currentEmployee', JSON.stringify(data.employee))
          this.currentEmployee = data.employee
          localStorage.setItem('currentEmployer', JSON.stringify(this.currentEmployer))
      },(err: any) => {
      if (!this.currentEmployee) {console.log('No ha iniciado sesión');}
          this.router.navigate(['/signin'])
      })
  }
   // -------------------------------------------------------------------------------------------
//    async getDataBeneficiarie(){

//     const filter = { idBeneficiarie: localStorage.getItem('currentIdBeneficiarie') }
//     console.log(filter);
//     await this.beneficiariesService.getOne(filter).toPromise().then((data: any) => {
//         localStorage.setItem('currentBeneficiarie', JSON.stringify(data.beneficiarie))
//         this.currentBeneficiarie = data.beneficiarie
//         console.log(this.currentBeneficiarie);
//         localStorage.setItem('currentBeneficiarie', JSON.stringify(this.currentBeneficiarie))
//     },(err: any) => {
//     if (!this.currentBeneficiarie) {console.log('No ha iniciado sesión');}
//         this.router.navigate(['/signin'])
//     })
// }
 // -------------------------------------------------------------------------------------------
   customToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity: severity, summary: summary, detail: detail});
}

 }
