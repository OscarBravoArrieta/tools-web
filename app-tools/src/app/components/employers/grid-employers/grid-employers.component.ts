import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { EmployersService } from 'src/app/services/employers.service'
import { TabPageEmployersComponent } from '../tab-page-employers/tab-page-employers.component';
import { ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-grid-employers',
  templateUrl: './grid-employers.component.html',
  styleUrls: ['./grid-employers.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe, MessageService, DialogService, MessageService]
})
export class GridEmployersComponent implements OnInit {

     results: any
     cols: any[]=[]
     status: any[]=[]
     selectedStatus: string = ''
     cutOffDate: Date = new(Date)
     showSpinner: boolean = false
     showDialog: boolean = false
     totalRecords: number = 0
     currentEmployer: any
     reportTitle: string = 'Catálogo de empleadores'


     constructor(
         private httpEmployers: EmployersService,
         private confirmationService: ConfirmationService,
         private router: Router,
         private primengConfig: PrimeNGConfig,
         public dialogService: DialogService,
         public messageService: MessageService,
         public datepipe: DatePipe

     ) {
         this.status = [
             {name: 'Activo', value: 'A'},
             {name: 'Inactivo', value: 'I'}
         ]
     }
     ref: DynamicDialogRef;
     // -------------------------------------------------------------------------------------------
     ngOnInit(): void {
         this.showSpinner = false;
         this.primengConfig.ripple = true
     }
     // -------------------------------------------------------------------------------------------
      async showEmployer(currentEmployer: any) {

         localStorage.setItem('currentIdEmployer', currentEmployer.ID)
         await this.getOne()
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
  async getOne(){
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
     getEmployers(): void {
         this.showSpinner = true;
         const filter = { status: this.selectedStatus, cutOffDate: this.datepipe.transform(this.cutOffDate, 'yyyy-MM-dd'), filterName: 'A', forSearchHelp: false}
         this.httpEmployers.getEmployers(filter).subscribe((data: any) => {
             this.results = data.employers
             this.getCols(7)
             this.showSpinner = false
         },(err: any) => {
             this.router.navigate(['/signin'])
          })
     }
     // -------------------------------------------------------------------------------------------
     test(e:any):void{ }
     // -------------------------------------------------------------------------------------------
     sendToQuery(): any  {
         this.getEmployers()
     }
     // -------------------------------------------------------------------------------------------
     validate() {
         if (!(this.selectedStatus) && (this.datepipe.transform(this.cutOffDate, 'yyyy-MM-dd') == null)){ //Ambos vacios
             this.confirmationService.confirm({
                 message: "Falta el Estado y la Fecha de Corte. La consulta mostrará todos los registros de empleadores. ¿Desea continuar?",
                 header: "Comfirmar",
                 icon: "pi pi-question-circle",
                 accept: () => {
                     this.sendToQuery()
                 },
                 reject: () => {
                     //this.sendToQuery(false)
                 }
             })
             return
         }
         if (this.selectedStatus) { //El estado está lleno
             if (this.datepipe.transform(this.cutOffDate, 'yyyy-MM-dd') != null ){ //Y la fecha está llena
                 this.sendToQuery()
                 return
             } else {
                 this.customToast('error', 'Error', 'La Fecha de Corte no es válida y/o está vacía')
                 return
             }
         } else{
             this.customToast('error', 'Error', 'No especificó el Estado de los aportantes')
             return
         }
     }
    // -------------------------------------------------------------------------------------------
    customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
    }
     // -------------------------------------------------------------------------------------------
     exportExcel() {
         this.showSpinner = true
         import("xlsx").then(xlsx => {
             const worksheet = xlsx.utils.json_to_sheet(this.results);
             const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
             const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
             this.saveAsExcelFile(excelBuffer, "Aportantes-");
             this.showSpinner = false
         });
     }
     // -------------------------------------------------------------------------------------------
    saveAsExcelFile(buffer: any, fileName: string): void {
         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
         let EXCEL_EXTENSION = '.xlsx';
         const data: Blob = new Blob([buffer], {
             type: EXCEL_TYPE
         });
         FileSaver.saveAs(data, fileName + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + EXCEL_EXTENSION);
     }
// -------------------------------------------------------------------------------------------
     closeDialog(): void{
         this.showDialog = false;
     }
     // -------------------------------------------------------------------------------------------
     handleDialogHide(e: any):void {
         this.showDialog = false

     }
     // -------------------------------------------------------------------------------------------
     ngOnDestroy() {

     }
     // -------------------------------------------------------------------------------------------
     getCols(nColumns: number):void{
         this.cols = []=[]
         let k = 0
         for (var key in this.results[0]) { //Key contains name of columns
             k ++
             if (k <= nColumns){
                 let object
                 object = {field: key, header: (key.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())  }
                 this.cols.push(object)
             }
         }
     }
     // -------------------------------------------------------------------------------------------

}
