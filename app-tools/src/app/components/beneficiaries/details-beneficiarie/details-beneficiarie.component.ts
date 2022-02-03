import { Component, OnInit } from '@angular/core'
import { BeneficiariesService } from 'src/app/services/beneficiaries.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-details-beneficiarie',
  templateUrl: './details-beneficiarie.component.html',
  styleUrls: ['./details-beneficiarie.component.css']
})
export class DetailsBeneficiarieComponent implements OnInit {

  currentBeneficiarie: any

  constructor(
       public beneficiariesService: BeneficiariesService,
       public router: Router
  ) { }

  ngOnInit(): void {
       this.getOne()
       this.currentBeneficiarie = localStorage.getItem('currentBeneficiarie')
       this.currentBeneficiarie = JSON.parse(this.currentBeneficiarie)
  }
  //-----------------------------------------------------------------------------------------------
   async getOne(){
    const filter = { idEmployee: localStorage.getItem('currentIdBeneficiarie') }
    await this.beneficiariesService.getOne(filter).toPromise().then((data: any) => {
        this.currentBeneficiarie = data.beneficiarie
        localStorage.setItem('currentBeneficiarie', JSON.stringify(data.beneficiarie))
        console.log('fdsfsadfsadfsadfsadfsadfdsa',data.beneficiarie);
   },(err: any) => {
   if (!this.currentBeneficiarie) {console.log('No ha iniciado sesión');}
       this.router.navigate(['/signin'])
   })

  }

}
