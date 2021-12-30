 import { Component, OnInit } from '@angular/core';
 import { MessageService } from 'primeng/api'
 import { EmployersService } from 'src/app/services/employers.service'
 import { EmployeesService } from 'src/app/services/employees.service';
 import { AuthService } from 'src/app/services/auth.service';
 import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
 import { Router } from '@angular/router';


 @Component({
    selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.css'],
  providers: [MessageService]
})
export class CheckStatusComponent implements OnInit {
     textAreaContent: string = ''
     selectedQuery: string = ''
     valuesToConsult: any[]=[]
     results: any[]=[]
     previusResult: any
     cols: any[]=[]
     totalRecords: number = 0
     reportTitle: string = 'Registros'

     constructor(
         public messageService: MessageService,
         private httpEmployers: EmployersService,
         private httpEmployees: EmployeesService,
         private httpBeneficiaries: BeneficiariesService,
         private authService: AuthService,
         private router: Router
     ) { }
     // -------------------------------------------------------------------------------------------

     ngOnInit(): void {
         if (!this.authService.loggIn()){
             this.router.navigate(['/signin'])
         }
     }
     // -------------------------------------------------------------------------------------------
     sendToQuery():void{
         this.valuesToConsult = this.textAreaContent.split('\n')
         if (this.textAreaContent.length==0) {
             this.customToast('error', 'Error', 'No hay datos para consultar')
             return
         }
         if (this.selectedQuery == ''){
             this.customToast('error', 'Error', 'Elija la opción a realizar')
             return
         }
         switch (this.selectedQuery){
              case 'E': //Employer
                  this.httpEmployers.getEmployersToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                      this.previusResult = data.employersToCheckStatus
                      this.getCols()
                  })
                  //identification = ID
                  break;
              case 'T': //Employee
                  this.httpEmployees.getEmployeesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                      this.previusResult = data.employeesToCheckStatus
                      this.getCols()
                  })
                  //identification = ID_AFILIADO
                  break;
              case 'B': //Beneficiarie
                    this.httpBeneficiaries.getBeneficiariesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                      this.previusResult = data.beneficiariesToCheckStatus
                      this.getCols()
                    })
                    //identification = CODIGO_BENEFICIARIO
                  break;
              case 'C': //Spouses
                    this.httpBeneficiaries.getSpousesToCheckStatus(this.valuesToConsult).subscribe((data: any) => {
                      this.previusResult = data.spousesToCheckStatus
                      this.getCols()
                    })
                    //identification = DOCUMENTO_CONYUGE
                    break;
         }
         this.results=[]
         this.valuesToConsult.forEach((index: any)=>{
              let found: boolean = true
              for (let object in this.previusResult){
                   if(this.previusResult[object].ID_AFILIADO === index){
                         this.results.push(this.previusResult[object])
                         found = true
                         break
                   }else{
                         found = false
                    }
              }
              if (!found){
                   this.results.push({TIPO_ID: 'N/A', ID_AFILIADO: index, ESTADO: 'NO ENCONTRADO'})
              }
          })
          console.log(this.results)
     }
     // -------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     // -------------------------------------------------------------------------------------------
     getCols():void{
      this.cols = []=[]
      for (var key in this.results[0]) {
          let object
          object = {field: key, header: (key.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())  }
          this.cols.push(object)
      }

  }

}
