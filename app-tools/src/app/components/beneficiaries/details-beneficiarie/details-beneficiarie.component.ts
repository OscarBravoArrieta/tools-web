import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-beneficiarie',
  templateUrl: './details-beneficiarie.component.html',
  styleUrls: ['./details-beneficiarie.component.css']
})
export class DetailsBeneficiarieComponent implements OnInit {

  currentBeneficiarie: any

  constructor() { }

  ngOnInit(): void {
       this.currentBeneficiarie = localStorage.getItem('currentBeneficiarie')
       this.currentBeneficiarie = JSON.parse(this.currentBeneficiarie)
       console.log('this',this.currentBeneficiarie)
  }

}
