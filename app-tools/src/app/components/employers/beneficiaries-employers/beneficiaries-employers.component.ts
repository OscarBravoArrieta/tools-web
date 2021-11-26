 import { Component, OnInit } from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';

 @Component({
     selector: 'app-beneficiaries-employers',
     templateUrl: './beneficiaries-employers.component.html',
     styleUrls: ['./beneficiaries-employers.component.css'],
     providers:[DatePipe]
 })
 export class BeneficiariesEmployersComponent implements OnInit {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]

     constructor(
         private httpEmployers: EmployersService,
         public datepipe: DatePipe) { }
     //--------------------------------------------------------------------------------------------
     ngOnInit(): void {
         this.getgetBeneficiariesEmployer()
     }
     //--------------------------------------------------------------------------------------------
     getgetBeneficiariesEmployer() {
         this.cols = [
             { field: 'DOCUMENTO_BENEFICIARIO', header: 'Identificación'},
             { field: 'TIPO_ID_BENEFICIARIO', header: 'Tipo id'},
             { field: 'BENEFICIARIO', header: 'Beneficiario'},
             { field: 'ESTADO', header: 'Estado'},
             { field: 'PARENTESCO', header: 'Parentesco'},
         ]
         const filter = { idEmployer: localStorage.getItem('currentIdEmployer') }
         this.httpEmployers.getBeneficiariesEmployer(filter).subscribe((data: any) => {
             this.results = data.beneficiariesEmployer
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
         this.saveAsExcelFile(excelBuffer, "Beneficiarios-" + localStorage.getItem('currentIdEmployer') +'-');
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
