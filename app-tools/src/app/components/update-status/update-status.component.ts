 import { Component, OnInit, Input } from '@angular/core'
 import { EmployersService } from 'src/app/services/employers.service'
 import { EmployeesService } from 'src/app/services/employees.service';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { RelatedTablesService } from 'src/app/services/related-tables.service';
 import { MessageService } from 'primeng/api'
 import { ConfirmationService} from 'primeng/api';
 import { AuthService } from 'src/app/services/auth.service';
 import { Router } from '@angular/router';
 import { DatePipe } from '@angular/common'

 @Component({
     selector: 'app-update-status',
     templateUrl: './update-status.component.html',
     styleUrls: ['./update-status.component.css'],
     providers: [MessageService, ConfirmationService]
 })
 export class UpdateStatusComponent implements OnInit {
     stateType: any
     selectedAction: string = ''
     selectedCodeAction: string = ''
     selectedReason: string = ''
     results: any[]=[]
     previusResult: any[]=[]
     showSpinner: boolean = false
     cols: any[]=[]
     totalRecords: number = 0
     stateOptions: any[]=[];
     reasonsForInactivationOptions: any[] = []
     reportTitle: string = 'Registros'
     selectedStatus: string = ''
     textAreaContent: string = ''
     valuesToConsult: any[]=[]
     idEmployer: string = ''

     constructor(
         public messageService: MessageService,
         private httpEmployers: EmployersService,
         private httpEmployees: EmployeesService,
         private httpBeneficiaries: BeneficiariesService,
         private confirmationService: ConfirmationService,
         private relatedTablesService: RelatedTablesService,
         private authService: AuthService,
         public datepipe: DatePipe,
         private router: Router) {
             this.stateOptions = [{label: 'Inactivo', value: 'I'}, {label: 'Activo', value: 'A'}, {label: 'Difunto', value: 'M'}];
             this.stateType = [
                 {name: 'Actualizar estado de aportantes', code: 'E'},
                 {name: 'Actualizar estado de trabajadores', code: 'T'},
                 {name: 'Actualizar estado de beneficiarios', code: 'B'},
                 {name: 'Actualizar estado de cónyuges', code: 'C'}
             ];
         }
     // ----------------------------------------------------------------------------------------------
     ngOnInit(): void {
         if (!this.authService.loggIn()){
             this.router.navigate(['/signin'])
         }
     }
     // ----------------------------------------------------------------------------------------------
     validate(nButton: number):void{
         if (this.textAreaContent.length==0) {
             this.customToast('error', 'Error', 'No hay datos para consultar y/o actualizar')
             return
         }
         if (this.selectedStatus == 'A'){
             //this.selectedReason = ''
         }
         if (this.selectedCodeAction == ''){
             this.customToast('error', 'Error', 'Elija la opción a realizar')
             return
         }

         if (nButton == 1) { //Consultar
             this.sendToQuery()
         }
         if (nButton == 2) {
             if(!this.selectedCodeAction){
                 this.customToast('error', 'Error', 'Ninguna acción seleccionada')
                 return
             }
             if(!this.selectedStatus){
                 this.customToast('error', 'Error', 'Seleccione el estado')
                 return
             }
             if ((this.selectedStatus == 'I') && (!this.selectedReason)){
                 this.customToast('error', 'Error', 'Seleccione el motivo de inactivación')
                 return
             }
             this.confirmationService.confirm({
                 message: `Actualizrá el estado de los registros.<br/> Esado: ${this.selectedStatus}  <br/><br/>¿Desea continuar?`,
                 header: "Comfirmar",
                 icon: "pi pi-question-circle",
                 accept: () => {
                     this.sendToUpdate()
                 },
                 reject: () => {
                     //this.sendToQuery(false)
                 }
             })
         }
     }
     // ----------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     // ----------------------------------------------------------------------------------------------
     handleChange():void{
         this.cols = []=[]
         this.getReasonForInactivation()
         if ((this.selectedStatus == 'M') && (this.selectedCodeAction == 'E')){ //Estado = Muerto y es empresa
             this.selectedStatus = ''
         }
     }

     // ----------------------------------------------------------------------------------------------
     async sendToQuery() {
         this.results=[]
         this.previusResult=[]
         this.valuesToConsult = this.textAreaContent.split('\n')
         if (this.valuesToConsult.length == 0){
             this.customToast('error', 'Error', 'No hay datos para consultar y/o actualizar')
             return
         }
         this.showSpinner = true
         switch (this.selectedCodeAction){
             case 'E': //Employer
                 await this.httpEmployers.getEmployersToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.employersToCheckStatus
                     this.showEmployeers()
                 })
                 break
             case 'T': //Employee
                 await this.httpEmployees.getEmployeesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.employeesToCheckStatus
                     this.showEmployees()
                  })
                  break;
             case 'B': //Beneficiarie
                 await this.httpBeneficiaries.getBeneficiariesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.beneficiariesToCheckStatus
                     this.showBeneficiaries()
                 })
                 break
             case 'C': //Spouses
                 await this.httpBeneficiaries.getSpousesToCheckStatus(this.valuesToConsult).toPromise().then((data: any) => {
                     this.previusResult = data.spousesToCheckStatus
                     this.showSpouses()
                 })
                 break;
         }
         this.results = [...this.results]
         this.showSpinner = false
     }
     // ----------------------------------------------------------------------------------------------
     sendToUpdate():void {
         this.valuesToConsult = this.textAreaContent.split('\n')
         var parameters

         switch (this.selectedCodeAction){
             case 'E': //Employer
                 parameters = {
                     valuesToConsult: this.valuesToConsult,
                     status: this.selectedStatus,
                     selectedReason: this.selectedReason
                 }
                 this.httpEmployers.updateEmployerStatus(parameters).subscribe((data: any)=>{
                     console.log(data.results)
                 })
                 break;
             case 'T': //Employee
                 parameters = {
                     valuesToConsult: this.valuesToConsult,
                     status: this.selectedStatus,
                     selectedReason: this.selectedReason,
                     idEmployer: this.idEmployer
                 }
                 this.httpEmployees.updateEmployeesStatus(parameters).subscribe((data: any)=>{
                     console.log(data.results)
                 })
                 break;
             case 'B': //Beneficiarie
             case 'C': //Spouses
                 parameters = {
                     valuesToConsult: this.valuesToConsult,
                     selectedCodeAction: this.selectedCodeAction,
                     status: this.selectedStatus,
                     selectedReason: this.selectedReason,
                 }
                 this.httpBeneficiaries.updateBeneficiariesStatus(parameters).subscribe((data: any)=>{
                     console.log(data.results)
                 })
                 break;
	     }
     }

     previusResultEmpty():void {
         this.valuesToConsult.forEach((index: any)=>{
             this.results.push({IDENTIFICACION: index, ESTADO: 'NO ENCONTRADO'})
         })
     }
     // ----------------------------------------------------------------------------------------------
     getReasonForInactivation():void{
         this.relatedTablesService.getReasonsForInactivation(this.selectedCodeAction).subscribe((data: any) => {
             this.reasonsForInactivationOptions = data.reasonForInactivation
         })
     }
     // ----------------------------------------------------------------------------------------------

     showEmployeers():void{
      if(this.previusResult.length == 0){
             this.previusResultEmpty()
             this.getCols()
      }
      if(this.previusResult.length > 0) {
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
     getCols():void{
         this.cols = []=[]
         for (var key in this.results[0]) {
             let object
             object = {field: key, header: (key.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())  }
             this.cols.push(object)
         }

     }
     // -------------------------------------------------------------------------------------------
     getIdEmployer(e: string):void{
          this.idEmployer = e
          console.log('id recibido:...', e)
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
     // -------------------------------------------------------------------------------------------
 }
