import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { EmployeesService } from 'src/app/services/employees.service';
import { Router, CanActivate } from '@angular/router';

import { TabPageEmployeesComponent } from '../tab-page-employees/tab-page-employees.component';
import { ConfirmationService, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-grid-employees',
  templateUrl: './grid-employees.component.html',
  styleUrls: ['./grid-employees.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe, MessageService, DialogService, MessageService]
})
export class GridEmployeesComponent implements OnInit {
  results: any
  cols: any[]=[]
  status: any[]=[]
  disableExport: boolean = false
  selectedStatus: string = ''
  cutOffDate: Date = new(Date)
  showSpinner: boolean = false
  reportTitle: string = 'Catálogo de trabajadores'
  totalRecords: number = 0

  constructor(
      private httpEmployees: EmployeesService,
      private confirmationService: ConfirmationService,
      private primengConfig: PrimeNGConfig,
      public dialogService: DialogService,
      public messageService: MessageService,
      public datepipe: DatePipe,
      public router: Router

      ) {
      this.status = [
          {name: 'Activo', value: 'A'},
          {name: 'Inactivo', value: 'I'},
          {name: 'Difunto', value: 'M'}
      ]
   }
   ref: DynamicDialogRef;
  //--------------------------------------------------------------------------------------------

  ngOnInit(): void {
      this.showSpinner = false;
      this.primengConfig.ripple = true
     //-- Role assignment

     if(localStorage.getItem('userRol') == '5'){
        this.disableExport = false
     } else {
         this.disableExport = true
     }

  }
  //--------------------------------------------------------------------------------------------
  getEmployees(): void {
      this.showSpinner = true;
      const filter = { status: this.selectedStatus, cutOffDate: this.datepipe.transform(this.cutOffDate, 'yyyy-MM-dd'), filterName: 'A', forSearchHelp: false}

      this.httpEmployees.getEmployees(filter).subscribe((data: any) => {
          this.results = data.employees
          this.getCols(7)
          this.showSpinner = false
      }, (err: any) => {
          if (!this.results) {this.customToast('error', 'Error', 'No ha iniciado sesión')}
          this.router.navigate(['/signin'])
      })
  }

  // -------------------------------------------------------------------------------------------
  exportExcel() {
      this.showSpinner = true
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.results);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Trabajadores-");
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

 saveAsCsvFile() {
     this.showSpinner = true
     const replacer = (key: any, value: any) => value === null ? '' : value;
     const header = Object.keys(this.results[0]);
     let csv = this.results.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
     csv.unshift(header.join(','));
     let csvArray = csv.join('\r\n');
     var blob = new Blob([csvArray], {type: 'text/csv' })
     saveAs(blob, 'Trabajadores-' + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + ".csv");
     this.showSpinner = false
}

// -------------------------------------------------------------------------------------------
  validate() {
   if (!(this.selectedStatus) && (this.datepipe.transform(this.cutOffDate, 'yyyy-MM-dd') == null)){ //Ambos vacios
      this.confirmationService.confirm({
          message: "Falta el Estado y la Fecha de Corte. La consulta mostrará todos los registros de trabajadores y puede tardar un poco. ¿Desea continuar?",
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
          this.customToast('error', 'Error', 'No especificó el Estado de los trabajadores')
          return
      }
  }
  // -------------------------------------------------------------------------------------------
  sendToQuery(): any  {

       this.getEmployees()

  }
  // -------------------------------------------------------------------------------------------
  customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
  }
  //--------------------------------------------------------------------------------------------
  showEmployee(currentEmployee: any) {
     let nameEmployee = 'Trabajador: '+ currentEmployee.TIPO_IDENTIFICACION + ' ' + currentEmployee.ID_AFILIADO + '-' + currentEmployee.AFILIADO
     localStorage.setItem('currentIdEmployee', currentEmployee.ID_AFILIADO)
     this.ref = this.dialogService.open(TabPageEmployeesComponent, {
         header: nameEmployee || '',
         closable: true,
         width: '60%',
         contentStyle: {"max-height": "700px", "min-height": "700px", "overflow": "auto"},
         baseZIndex: 10000
     });
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
