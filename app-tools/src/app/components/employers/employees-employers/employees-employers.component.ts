 import { Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';
@Component({
     selector: 'app-employees-employers',
     templateUrl: './employees-employers.component.html',
     styleUrls: ['./employees-employers.component.css'],
     providers:[DatePipe]
})
export class EmployeesEmployersComponent implements OnInit, OnDestroy {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]
     disableExport: boolean = false

     constructor(
         private httpEmployers: EmployersService,
         public datepipe: DatePipe)
      {}

     // ----------------------------------------------------------------

     ngOnInit(): void {
         this.getEmployeesEmployer()
         //-- Role assignment

         if(localStorage.getItem('userRol') == '5'){
             this.disableExport = false
         } else {
             this.disableExport = true
         }

     }
     // -----------------------------------------------------------------
     getEmployeesEmployer() {
         this.cols = [
             { field: 'ID_AFILIADO', header: 'Identificación'},
             { field: 'TIPO_IDENTIFICACION', header: 'Tipo id'},
             { field: 'AFILIADO', header: 'Afiliado'},
             { field: 'ESTADO', header: 'Estado'},
             { field: 'TIPO_COTIZANTE', header: 'Tipo cotizante'},
         ];

         const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
         this.httpEmployers.getEmployeesEmployer(filter).subscribe((data: any) => {
             this.results = data.employeesEmployer
         })
     }
     // -----------------------------------------------------------------
     test():void{}
     // -----------------------------------------------------------------
     exportExcel() {
      this.showSpinner = true

      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.results);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Trabajadores-" + localStorage.getItem('currentIdEmployer') +'-');
          this.showSpinner = false
      });
  }
  // -----------------------------------------------------------------
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + EXCEL_EXTENSION);
  }
     // -----------------------------------------------------------------
     ngOnDestroy():void {}
     // -----------------------------------------------------------------
}
