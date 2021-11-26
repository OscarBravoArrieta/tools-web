import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-employees',
  templateUrl: './details-employees.component.html',
  styleUrls: ['./details-employees.component.css']
})
export class DetailsEmployeesComponent implements OnInit {

  currentEmployee: any

  constructor() { }

  ngOnInit(): void {
      this.currentEmployee = localStorage.getItem('currentEmployee')
      this.currentEmployee = JSON.parse(this.currentEmployee)

  }
}
