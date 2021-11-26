 import { Component, OnInit } from '@angular/core';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { DatePipe } from '@angular/common'
 import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-monetary-subsidy-beneficiarie',
  templateUrl: './monetary-subsidy-beneficiarie.component.html',
  styleUrls: ['./monetary-subsidy-beneficiarie.component.css']
})
export class MonetarySubsidyBeneficiarieComponent implements OnInit {
     results: any
     showSpinner: boolean = false
     cols: any[]=[]
     reportTitle: string = 'Subsidios pagados'

  constructor(private httpBeneficiarieService: BeneficiariesService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
     this.getBeneficiaryMonetarySubsidy()
  }
  getBeneficiaryMonetarySubsidy():void{
     this.cols = [
         { field: 'PERIODO_GIRO', header: 'Periodo girado'},
         { field: 'PERIODO_PAGADO', header: 'Periodo pagado'},
         { field: 'CODIGO_BENEFICIARIO', header: 'Código beneficiario'},
         { field: 'VALOR_SUBDIDIO', header: 'Vlr subsidio'},
         { field: 'AJUSTE', header: 'Ajuste'},
         { field: 'FECHA_CONSIGNACION', header: 'Fecha consignación'},
         { field: 'FORMA_PAGO', header: 'Forma de pago'},
         { field: 'NUMERO_CUOTAS', header: 'Nro. cuotas'}
     ]
     const filter = { beneficiaryCode: localStorage.getItem('currentIdBeneficiarie') }
     this.httpBeneficiarieService.getBeneficiaryMonetarySubsidy(filter).subscribe((data: any) => {
          this.results = data.monetarySubsidyBeneficiarie
     })

  }
  exportExcel() {
    this.showSpinner = true
    import("xlsx").then(xlsx => {
       const worksheet = xlsx.utils.json_to_sheet(this.results);
       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
       this.saveAsExcelFile(excelBuffer, "Beneficiario-" + localStorage.getItem('currentIdBeneficiarie') +'-')
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
