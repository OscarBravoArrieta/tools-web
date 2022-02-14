import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import * as FileSaver from 'file-saver';
import { PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TabPageBeneficiariesComponent } from '../tab-page-beneficiaries/tab-page-beneficiaries.component';

@Component({
  selector: 'app-grid-beneficiaries',
  templateUrl: './grid-beneficiaries.component.html',
  styleUrls: ['./grid-beneficiaries.component.css'],
  providers: [ConfirmationService, DatePipe, MessageService, DialogService, MessageService]
})
export class GridBeneficiariesComponent implements OnInit {
  results: any
  showSpinner: boolean = false
  cols: any[]=[]
  totalRecords: number = 0
  status: any[]=[]
  selectedStatus: string = ''
  cutOffDate: Date = new(Date)
  reportTitle: string = 'Catálogo de beneficiarios'

  constructor(
      private httpBeneficiaries: BeneficiariesService,
      private primengConfig: PrimeNGConfig,
      private router: Router,
      public messageService: MessageService,
      public dialogService: DialogService,
      public datepipe: DatePipe) { }

  ngOnInit(): void {

      this.showSpinner = false;
      this.primengConfig.ripple = true;
      this.status = [
          {name: 'Activo', value: 'A'},
          {name: 'Inactivo', value: 'I'},
          {name: 'Difunto', value: 'M'}
      ]
   }
  ref: DynamicDialogRef;
  getBeneficiaries():void{


      this.showSpinner = true;
      const filter = { status: this.selectedStatus, filterName: this.selectedStatus, forSearchHelp: false}
      this.httpBeneficiaries.getBeneficiaries(filter).subscribe((data: any) => {
          this.results = data.beneficiaries
          this.getCols(9)
          this.showSpinner = false
      }, (err: any) => {
          this.router.navigate(['/signin'])
      })
  }
  //--------------------------------------------------------------------------------------------
  validate():void{
      if (!this.selectedStatus) {
          this.customToast('error', 'Error', 'No especificó el Estado de los beneficiarios')
          return
      }else{
      this.getBeneficiaries()
   }
  }
  //--------------------------------------------------------------------------------------------

  showBeneficiarie(currentBeneficiarie: any) {
       let nameBeneficiarie = 'Beneficiario: '+ currentBeneficiarie.TIPO_ID_BENEFICIARIO + ' ' + currentBeneficiarie.DOCUMENTO_BENEFICIARIO + '-' + currentBeneficiarie.BENEFICIARIO
       localStorage.setItem('currentIdBeneficiarie', currentBeneficiarie.CODIGO_BENEFICIARIO)
       localStorage.setItem('beneficiaryType', currentBeneficiarie.PARENTESCO)

       this.ref = this.dialogService.open(TabPageBeneficiariesComponent, {
           header: nameBeneficiarie || '',
           closable: true,
           width: '60%',
           contentStyle: {"max-height": "700px", "min-height": "700px", "overflow": "auto"},
           baseZIndex: 10000
       });
 }

  customToast(severity: string, summary: string, detail: string) {
      this.messageService.add({severity: severity, summary: summary, detail: detail});
  }

  //--------------------------------------------------------------------------------------------
  exportExcel() {
      this.showSpinner = true
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.results);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "Personas a cargo-");
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
  saveAsCsvFile() {
     this.showSpinner = true
     const replacer = (key: any, value: any) => value === null ? '' : value;
     const header = Object.keys(this.results[0]);
     let csv = this.results.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
     csv.unshift(header.join(','));
     let csvArray = csv.join('\r\n');
     var blob = new Blob([csvArray], {type: 'text/csv' })
     saveAs(blob, 'Personas a cargo-' + this.datepipe.transform(new Date(), 'yyyy-MM-dd') + '-' + new Date().getTime() + ".csv");
     this.showSpinner = false
  }

// ------------------------------------------------------------------------------------------

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
