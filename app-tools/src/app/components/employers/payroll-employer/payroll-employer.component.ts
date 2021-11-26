 import { Component, OnInit } from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payroll-employer',
  templateUrl: './payroll-employer.component.html',
  styleUrls: ['./payroll-employer.component.css']
})
export class PayrollEmployerComponent implements OnInit {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]

     constructor(
         private httpEmployers: EmployersService,
         public datepipe: DatePipe) { }

     ngOnInit(): void {
         this.getPayrollEmployer()
     }
     getPayrollEmployer() {
      this.cols = [
          { field: 'NUMERO', header: 'Número'},
          { field: 'RADICADO', header: 'Radicado'},
          { field: 'PERIODO', header: 'Periodo'},
          { field: 'FECHA_PAGO', header: 'Fecha pago'},
          { field: 'FECHA_SISTEMA', header: 'Fecha sistema'},
          { field: 'VALOR_CONSIGNADO', header: 'Valor consignado'},
          { field: 'INTERESES', header: 'Intereses'},
          { field: 'NUM_TRABAJADORES', header: 'No afiliados'},
      ]
      const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
      this.httpEmployers.getPayrollEmployer(filter).subscribe((data: any) => {
             this.results = data.payrollEmployer
      })
     }
     //--------------------------------------------------------------------------------------------
     test():void{}
     //--------------------------------------------------------------------------------------------
     exportExcel() {
         this.showSpinner = true
         import("xlsx").then(xlsx => {
             const worksheet = xlsx.utils.json_to_sheet(this.results);
             const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
             const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
             this.saveAsExcelFile(excelBuffer, "Planillas-" + localStorage.getItem('currentIdEmployer') +'-');
             this.showSpinner = false
         });
     }
     //--------------------------------------------------------------------------------------------
     saveAsExcelFile(buffer: any, fileName: string): void {
         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
         let EXCEL_EXTENSION = '.xlsx';
         const data: Blob = new Blob([buffer], {
             type: EXCEL_TYPE
         });
         FileSaver.saveAs(data, fileName + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + EXCEL_EXTENSION);
  }
  //--------------------------------------------------------------------------------------------
}
