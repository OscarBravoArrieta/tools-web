 import { Component, OnInit } from '@angular/core';
 import { EmployeesService } from 'src/app/services/employees.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';

 @Component({
     selector: 'app-monetary-subsidy-employee',
     templateUrl: './monetary-subsidy-employee.component.html',
     styleUrls: ['./monetary-subsidy-employee.component.css'],
     providers:[DatePipe]
 })
 export class MonetarySubsidyEmployeeComponent implements OnInit {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]
     reportTitle: string = 'Subsidios pagados'

     constructor(
         private httpEmployers: EmployeesService,
         public datepipe: DatePipe) { }

     ngOnInit(): void {
         this.getMonetarySubsidy()
     }
     //--------------------------------------------------------------------------------------------
     getMonetarySubsidy():void{
         this.cols = [
             { field: 'NIT', header: 'Nit'},
             { field: 'RAZON_SOCIAL', header: 'Razón social'},
             { field: 'BENEFICIARIO', header: 'Beneficiario'},
             { field: 'NUMERO_CUOTAS', header: 'NoCuotas'},
             { field: 'VALOR_SUBDIDIO', header: 'VlrSubsidio'},
             { field: 'FORMA_PAGO', header: 'FormaPago'},
             { field: 'SUCURSAL', header: 'Sucursal'},
             { field: 'PERIODO_GIRO', header: 'Periodo'},
             { field: 'PERIODO_PAGADO', header: 'PeriodoPagado'},
             { field: 'RESPONSABLE', header: 'Responsable'},
             { field: 'CONYUGE', header: 'Cónyuge'},
             { field: 'CODIGO_BENEFICIARIO', header: 'CodBen'},
            //  { field: 'TIPO_GIRO', header: 'TipoGiro'},
            //  { field: 'CUENTA', header: 'Cuenta'},
            //  { field: 'CHEQUE', header: 'Cheque'},
            //  { field: 'AJUSTE', header: 'Ajuste'},
            //  { field: 'VALOR_CREDITO', header: 'VlrCredito'},
            //  { field: 'ANULADO', header: 'Anulado'},
            //  { field: 'FECHA_CONSIGNACION', header: 'FechaConsigna'}
         ]
         const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
         this.httpEmployers.getMonetarySubsidy(filter).subscribe((data: any) => {
             this.results = data.monetarySubsidy
         })
     }
     //--------------------------------------------------------------------------------------------
     exportExcel() {
         this.showSpinner = true
         import("xlsx").then(xlsx => {
             const worksheet = xlsx.utils.json_to_sheet(this.results);
             const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
             const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
             this.saveAsExcelFile(excelBuffer, "Subsidios pagaos-" + localStorage.getItem('currentIdEmployee') +'-');
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
