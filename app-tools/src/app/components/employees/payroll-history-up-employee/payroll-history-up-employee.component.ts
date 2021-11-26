import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { DatePipe } from '@angular/common'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-payroll-history-up-employee',
  templateUrl: './payroll-history-up-employee.component.html',
  styleUrls: ['./payroll-history-up-employee.component.css'],
  providers:[DatePipe]
})
export class PayrollHistoryUpEmployeeComponent implements OnInit {
  results: any
  showSpinner: boolean = false
  cols: any[]=[]
  reportTitle: string = 'Trayectoria de pila'

  constructor(
    private httpEmployers: EmployeesService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPayrollHistoryUp()
  }
  getPayrollHistoryUp(): void {
    this.cols = [
        { field: 'PLANILLA', header: 'Planilla'},
        { field: 'NIT', header: 'Nit'},
        { field: 'RAZON_SOCIAL', header: 'Razón social'},
        { field: 'PERIODO_APORTE', header: 'Periodo'},
        { field: 'FECHA_RECAUDO', header: 'Fecha recaudo'},
        { field: 'VALOR_NOMINA', header: 'Nomina'},
        { field: 'DIAS', header: 'Dias'},
        { field: 'INGRESO', header: 'Ing'},
        { field: 'RETIRO', header: 'Ret'},
        { field: 'VPS', header: 'Vps'},
        { field: 'VTS', header: 'Vts'},
        { field: 'SLN', header: 'Sln'},
        { field: 'IGE', header: 'Ige'},
        { field: 'LMA', header: 'Lma'},
        { field: 'DIAS', header: 'Días'}
    ]
    const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
    this.httpEmployers.getPayrollHistoryUp(filter).subscribe((data: any) => {
        this.results = data.payrollHistoryUp
    })


}
exportExcel() {
  this.showSpinner = true
  import("xlsx").then(xlsx => {
     const worksheet = xlsx.utils.json_to_sheet(this.results);
     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
     this.saveAsExcelFile(excelBuffer, "Trayectoria pila-" + localStorage.getItem('currentIdEmployee') +'-');
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
