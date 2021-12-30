 import { Component, OnInit } from '@angular/core';
 import { ConfirmationService, MessageService} from 'primeng/api';
 import { DatePipe } from '@angular/common'
 import { EmployersService } from 'src/app/services/employers.service';
 import { Router } from '@angular/router';

 @Component({
     selector: 'app-payroll-report',
     templateUrl: './payroll-report.component.html',
     styleUrls: ['./payroll-report.component.css'],
     providers: [ConfirmationService, MessageService, DatePipe]
 })

 export class PayrollReportComponent implements OnInit {
     results: any
     startDate: Date = new Date()
     endDate: Date = new Date()
     cols: any[]=[]
     reportTitle: string = 'Reporte de nómina'
     showSpinner: boolean = false
     totalRecords: number = 0

     constructor(public messageService: MessageService,
                 private httpEmployers: EmployersService,
                 public datepipe: DatePipe,
                 private router: Router,  ) { }
     // -------------------------------------------------------------------------------------------
     ngOnInit(): void {
     }
     // -------------------------------------------------------------------------------------------
     validate(): void{
         if(this.endDate < this.startDate) {
             this.customToast('error', 'Error', 'Fecha final debe ser mayor que inicial')
             return
         }
         if((this.startDate > new(Date)) || (this.endDate > new(Date) )){
             this.customToast('error', 'Error', 'Fechas deben ser menores o iguales que fecha actual')
             return
         }
         if (((this.datepipe.transform(this.startDate, 'yyyy-MM-dd') == null)) || (this.datepipe.transform(this.endDate, 'yyyy-MM-dd') == null)){
             this.customToast('error', 'Error', 'Una o más fechas están vacías')
             return
         }
         this.getpayrollReport()
     }
     // -------------------------------------------------------------------------------------------
     getpayrollReport(): void {
         this.showSpinner = true
         const dateRange = { startPeriod: this.datepipe.transform(this.startDate, 'YYYYMM'), endPeriod: this.datepipe.transform(this.endDate, 'YYYYMM')}
         this.httpEmployers.payrollReport(dateRange).subscribe((data:any)=>{
             this.results = data.payrollReport
             this.getCols(7)
             this.showSpinner = false
         },(err: any) => {
             this.router.navigate(['/signin'])
         })
     }
     // -------------------------------------------------------------------------------------------

     changeDate(){

     }
     // -------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
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
     saveAsCsvFile() {
      this.showSpinner = true
      const replacer = (key: any, value: any) => value === null ? '' : value;
      const header = Object.keys(this.results[0]);
      let csv = this.results.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
      csv.unshift(header.join(','));
      let csvArray = csv.join('\r\n');
      var blob = new Blob([csvArray], {type: 'text/csv' })
      saveAs(blob, 'Reporte de nómina - ' + this.datepipe.transform(this.startDate, 'YYYYMM') +" A "+ this.datepipe.transform(this.endDate, 'YYYYMM') + " - " + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() +".csv");
      this.showSpinner = false
 }

}
