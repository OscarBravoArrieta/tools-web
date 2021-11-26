import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { DatePipe } from '@angular/common'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-beneficiaries-employee',
  templateUrl: './beneficiaries-employee.component.html',
  styleUrls: ['./beneficiaries-employee.component.css']
})
export class BeneficiariesEmployeeComponent implements OnInit {
  results: any
  showSpinner: boolean = false
  cols: any[]=[]
  reportTitle: string = 'Beneficiarios'

  constructor(private httpEmployers: EmployeesService,
     public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getBeneficiariesEmployee()
 }
//--------------------------------------------------------------------------------------------
getBeneficiariesEmployee(): void {
    this.cols = [
        { field: 'DOCUMENTO_BENEFICIARIO', header: 'Identificación'},
        { field: 'TIPO_ID_BENEFICIARIO', header: 'Tipo id'},
        { field: 'BENEFICIARIO', header: 'Beneficiario'},
        { field: 'ESTADO', header: 'Estado'},
        { field: 'PARENTESCO', header: 'Parentesco'},
    ]
   const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
   this.httpEmployers.getBeneficiariesEmployee(filter).subscribe((data: any) => {
        this.results = data.beneficiariesEmployee
        console.log('getBeneficiariesEmployee', this.results)
   })


}
//--------------------------------------------------------------------------------------------
getPayrollHistory(): void {
    this.cols = [
        { field: 'NIT', header: 'Nit'},
        { field: 'RAZON_SOCIAL', header: 'Razón social'},
        { field: 'SUCURSAL', header: 'Sucursal'},
        { field: 'PERIODO', header: 'Periodo'},
        { field: 'HORAS', header: 'Horas'},
        { field: 'SUELDO', header: 'Sueldo'}
    ]
    const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
    this.httpEmployers.getPayrollHistory(filter).subscribe((data: any) => {
        this.results = data.payrollHistory
        console.log('getPayrollHistory', this.results)
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
    this.saveAsExcelFile(excelBuffer, "Beneficiarios-" + localStorage.getItem('currentIdEmployee') +'-')
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
