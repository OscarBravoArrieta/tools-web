 import { Component, OnInit } from '@angular/core';
 import { MessageService } from 'primeng/api'
 import { EmployersService } from 'src/app/services/employers.service'
 import { EmployeesService } from 'src/app/services/employees.service';
 import { AuthService } from 'src/app/services/auth.service';
 import { DatePipe } from '@angular/common'
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { Router } from '@angular/router';


 @Component({
     selector: 'app-check-status',
     templateUrl: './check-status.component.html',
     styleUrls: ['./check-status.component.css'],
     providers: [MessageService]
 })
 export class CheckStatusComponent implements OnInit {
     textAreaContent: string = ''
     selectedQuery: string = ''
     valuesToConsult: any[]=[]
     results: any[]=[]
     previusResult: any[]=[]
     cols: any[]=[]
     totalRecords: number = 0
     reportTitle: string = 'Registros'
     showSpinner: boolean = false

     constructor(
         public messageService: MessageService,
         private httpEmployers: EmployersService,
         private httpEmployees: EmployeesService,
         private httpBeneficiaries: BeneficiariesService,
         private authService: AuthService,
         public datepipe: DatePipe,
         private router: Router
     ) { }
     // -------------------------------------------------------------------------------------------

     ngOnInit(): void {
         if (!this.authService.loggIn()){
             this.router.navigate(['/signin'])
         }
     }
     // -------------------------------------------------------------------------------------------
     async sendToQuery() {
         this.results=[]
         this.previusResult=[]
         this.valuesToConsult = this.textAreaContent.split('\n')
         if (this.textAreaContent.length==0) {
             this.customToast('error', 'Error', 'No hay datos para consultar')
             return
         }
         if (this.selectedQuery == '') {
             this.customToast('error', 'Error', 'Elija la opción a realizar')
             return
         }
         this.showSpinner = true
         switch (this.selectedQuery){
             case 'E': //Employer
                 await this.httpEmployers.getEmployersToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.employersToCheckStatus
                     console.log('Empleadores...',this.previusResult)
                     this.showEmployeers()
                 },(err: any) => {
                  if (!this.previusResult) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
                       this.router.navigate(['/signin'])
                })
                 break;
             case 'T': //Employee
                 await this.httpEmployees.getEmployeesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.employeesToCheckStatus
                     console.log('Trabajadores...',this.previusResult)
                     this.showEmployees()
                  },(err: any) => {
                    if (!this.previusResult) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
                         this.router.navigate(['/signin'])
                  });
                 break;
              case 'B': //Beneficiarie
                     await this.httpBeneficiaries.getBeneficiariesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                         this.previusResult = data.beneficiariesToCheckStatus
                         console.log('Beneficiaries...',this.previusResult)
                         this.showBeneficiaries()
                     },(err: any) => {
                      if (!this.previusResult) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
                           this.router.navigate(['/signin'])
                    })
                 break;
              case 'C': //Spouses
                     await this.httpBeneficiaries.getSpousesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                         this.previusResult = data.spousesToCheckStatus
                         this.showSpouses()
                     },(err: any) => {
                      if (!this.previusResult) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
                           this.router.navigate(['/signin'])
                    })
                     break;
         }
         this.results = [...this.results]
         this.showSpinner = false
     }
     // -------------------------------------------------------------------------------------------
     previusResultEmpty():void {
         this.valuesToConsult.forEach((index: any)=>{
             this.results.push({IDENTIFICACION: index, ESTADO: 'NO ENCONTRADO'})
         })
     }
     // -------------------------------------------------------------------------------------------
     showEmployeers():void{
         if(this.previusResult.length == 0){
             this.previusResultEmpty()
             this.getCols()
         }
         if(this.previusResult.length > 0){
             this.valuesToConsult.forEach((index: any)=>{
                 let found: boolean = true
                 for (let object in this.previusResult){
                     if(this.previusResult[object].ID === index){
                         this.results.push(this.previusResult[object])
                         found = true
                         break
                     }else{
                         found = false
                     }
                 }
                 if (!found){
                     this.results.push({ ID: index, DIGITO: '', ESTADO: 'NO ENCONTRADO', TIPOIDENTIFICACION: '', RAZON_SOCIAL: ''})
                 }
             })
             this.getCols()
         }
     }
    // -------------------------------------------------------------------------------------------
     showEmployees():void {
         if(this.previusResult.length == 0){
             this.previusResultEmpty()
             this.getCols()
         }
         if(this.previusResult.length > 0){
             this.valuesToConsult.forEach((index: any)=>{
                 let found: boolean = true
                 for (let object in this.previusResult){
                     if(this.previusResult[object].ID_AFILIADO === index){
                         this.results.push(this.previusResult[object])
                         found = true
                         break
                     }else{
                         found = false
                     }
                 }
                 if (!found){
                     this.results.push({TIPO_ID: '', ID_AFILIADO: index, ESTADO: 'NO ENCONTRADO', TIPO_COTIZANTE: '', AFILIADO: '', CATEGORIA: '', ID_EMPRESA: '', RAZON_SOCIAL:''})
                 }
             })
             this.getCols()
         }

     }
     // -------------------------------------------------------------------------------------------
     showBeneficiaries():void {
         if(this.previusResult.length == 0){
             this.previusResultEmpty()
             this.getCols()
         }
         if(this.previusResult.length > 0){
             this.valuesToConsult.forEach((index: any)=>{
                 let found: boolean = true
                 for (let object in this.previusResult){
                     if(this.previusResult[object].CODIGO_BENEFICIARIO === index){
                         this.results.push(this.previusResult[object])
                         found = true
                         break
                     }else{
                         found = false
                     }
                 }
                 if (!found){
                     this.results.push({TIPO_ID: '', ID: '', CODIGO_BENEFICIARIO: index, ESTADO: 'NO ENCONTRADO', BENEFICIARIO: '', PARENTESCO: '', CATEGORIA: '', NIT_EMPRESA: '', RAZON_SOCIAL: '', ID_AFILIADO:'', AFILIADO: '' })
                 }
             })
             this.getCols()
         }
     }
     // -------------------------------------------------------------------------------------------
     showSpouses():void{
         if(this.previusResult.length == 0){
             this.previusResultEmpty()
             this.getCols()
         }
         if(this.previusResult.length > 0){
             this.valuesToConsult.forEach((index: any)=>{
                 let found: boolean = true
                 for (let object in this.previusResult){
                     if(this.previusResult[object].DOCUMENTO_CONYUGE === index){
                         this.results.push(this.previusResult[object])
                         found = true
                         break
                     }else{
                         found = false
                     }
                 }
                 if (!found){
                     this.results.push({TIPO_ID: '', DOCUMENTO_CONYUGE: index, ESTADO: 'NO ENCONTRADO', CONYUGE: '', PARENTESCO: '', CATEGORIA: '', NIT_EMPRESA: '', RAZON_SOCIAL: '', ID_AFILIADO:'', AFILIADO: '' })
                 }
             })
              this.getCols()
         }
     }
     // -------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     // -------------------------------------------------------------------------------------------
     getCols():void{
         this.cols = []=[]
         for (var key in this.results[0]) {
             let object
             object = {field: key, header: (key.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())  }
             this.cols.push(object)
         }
     }
     // -------------------------------------------------------------------------------------------
     saveAsCsvFile() {
         this.showSpinner = true
         const replacer = (key: any, value: any) => value === null ? '' : value;
         const header = Object.keys(this.results[0]);
         let csv = this.results.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
         csv.unshift(header.join(','));
         let csvArray = csv.join('\r\n');
         var blob = new Blob([csvArray], {type: 'text/csv' })
         saveAs(blob, 'VerificarEstado - ' + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + ".csv");
         this.showSpinner = false
     }
}
