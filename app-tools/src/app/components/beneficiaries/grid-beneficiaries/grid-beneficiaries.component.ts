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
         //  {name: 'Inactivo', value: 'I'}
      ]
   }
  ref: DynamicDialogRef;
  getBeneficiaries():void{
      this.showSpinner = true;
      const filter = { status: this.selectedStatus, filterName: 'A', forSearchHelp: false}
      this.cols = [
          { field: 'TIPO_ID_BENEFICIARIO', header: 'Tipo id'},
          { field: 'DOCUMENTO_BENEFICIARIO', header: 'DocBeneficiario'},
          { field: 'CODIGO_BENEFICIARIO', header: 'CodBeneficiario'},
          { field: 'BENEFICIARIO', header: 'Beneficiario'},
          { field: 'ESTADO', header: 'Estado'},
          { field: 'NIT_EMPRESA', header: 'Ni'},
          { field: 'RAZON_SOCIAL', header: 'Razón social'},
          { field: 'ID_AFILIADO', header: 'IdAfiliado'},
          { field: 'AFILIADO', header: 'Afiliado'}
      ]

      this.httpBeneficiaries.getBeneficiaries(filter).subscribe((data: any) => {
          this.results = data.beneficiaries
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
  editBeneficiarie(currentBeneficiarie: any):void{
      let nameBeneficiarie = 'Beneficiario: '+ currentBeneficiarie.TIPO_ID_BENEFICIARIO + ' ' + currentBeneficiarie.DOCUMENTO_BENEFICIARIO + '-' + currentBeneficiarie.BENEFICIARIO
      localStorage.setItem('currentBeneficiarie', JSON.stringify(currentBeneficiarie))
      localStorage.setItem('currentIdBeneficiarie', currentBeneficiarie.CODIGO_BENEFICIARIO)
      this.ref = this.dialogService.open(TabPageBeneficiariesComponent, {
          header: nameBeneficiarie,
          closable: true,
          width: '60%',
          contentStyle: {"max-height": "700px", "min-height": "700px", "overflow": "auto"},
          baseZIndex: 10000
      });
  }
  //--------------------------------------------------------------------------------------------

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
}
