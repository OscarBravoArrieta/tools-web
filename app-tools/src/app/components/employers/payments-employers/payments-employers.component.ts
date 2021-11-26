 import { Component, OnInit } from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';

 @Component({
     selector: 'app-payments-employers',
     templateUrl: './payments-employers.component.html',
     styleUrls: ['./payments-employers.component.css'],
     providers: [DatePipe]
 })
 export class PaymentsEmployersComponent implements OnInit {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]

     constructor(
         private httpEmployers: EmployersService,
         public datepipe: DatePipe
     ) {  }
     // -------------------------------------------------------------------------------------------
     ngOnInit(): void { this.getPaymentsEmployer()}
     // -------------------------------------------------------------------------------------------
     getPaymentsEmployer() {
      this.cols = [
          { field: 'SUCURSAL', header: 'Sucursal'},
          { field: 'MARCA', header: 'Marca'},
          { field: 'DOCUMENTO', header: 'Documento'},
          { field: 'RECIBO', header: 'Recibo'},
          { field: 'PERIODO', header: 'Periodo'},
          { field: 'NOMINA', header: 'Vlr Nomina'},
          { field: 'VALOR_CONSIGNADO', header: 'Vlr aporte'},
          { field: 'INTERES', header: 'Intereses'},
          { field: 'FECHA_PAGO', header: 'Fecha pago'},
          { field: 'FECHA_SISTEMA', header: 'Fecha sistema'}
      ]
      const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
      this.httpEmployers.getPaymentsEmployer(filter).subscribe((data: any) => {
          this.results = data.paymentsEmployer
      })

     }

     // -------------------------------------------------------------------------------------------
     test():void { }
     // -------------------------------------------------------------------------------------------
     exportExcel() {
      this.showSpinner = true
      import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(this.results);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "AportesPagados-" + localStorage.getItem('currentIdEmployer') +'-');
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


