 import { Component, OnInit, Input } from '@angular/core'
 import { EmployersService } from 'src/app/services/employers.service'
 import { EmployeesService } from 'src/app/services/employees.service';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { RelatedTablesService } from 'src/app/services/related-tables.service';
 import { MessageService } from 'primeng/api'
 import { ConfirmationService} from 'primeng/api';

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
     results: any
     endResults: any
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
         private relatedTablesService: RelatedTablesService) {
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
                 this.consolidateJson()
              }
         })
      }
   }
     // ----------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     // ----------------------------------------------------------------------------------------------
     test():void{
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
     sendToQuery():void {
         this.valuesToConsult = this.textAreaContent.split('\n')
         if (this.valuesToConsult.length == 0){
             this.customToast('error', 'Error', 'No hay datos para consultar y/o actualizar')
             return
         }


         switch (this.selectedCodeAction){
             case 'E': //Employer
                 this.httpEmployers.getEmployersToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                     this.results = data.employersToCheckStatus
                     this.getCols()
                 })
                 break;
             case 'T': //Employee
                  this.httpEmployees.getEmployeesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                     this.results = data.employeesToCheckStatus
                     this.getCols()
                  })
                  break;
             case 'B': //Beneficiarie
                   this.httpBeneficiaries.getBeneficiariesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                     this.results = data.beneficiariesToCheckStatus
                     this.getCols()
                   })
                  break;
             case 'C': //Spouses
                   this.httpBeneficiaries.getSpousesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                      this.results = data.spousesToCheckStatus
                      this.getCols()
                   })
                   break;
         }
        //  if (!this.results) {
        //      this.customToast('error', 'Error', 'La consulta no produjo resultados')
        //      this.results = null
        //  }
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
     // ----------------------------------------------------------------------------------------------
     getReasonForInactivation():void{
         this.relatedTablesService.getReasonsForInactivation(this.selectedCodeAction).subscribe((data: any) => {
             this.reasonsForInactivationOptions = data.reasonForInactivation
         })
     }
     // ----------------------------------------------------------------------------------------------
     getCols():void{
         this.cols = []=[]
         for (var key in this.results[0]) {
             let object
             object = {field: key, header: (key.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())  }
             this.cols.push(object)
         }

     }
     getIdEmployer(e: string):void{
          this.idEmployer = e
          console.log('id recibido:...', e)
     }

     consolidateJson():void{
      for (var key in this.results) {
          console.log(this.results[key].ID_AFILIADO)

      }


     }


 }
