 import { Component, OnInit } from '@angular/core';
 import { EmployeesService } from 'src/app/services/employees.service';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-details-employees',
  templateUrl: './details-employees.component.html',
  styleUrls: ['./details-employees.component.css']
})
export class DetailsEmployeesComponent implements OnInit {

  currentEmployee: any

  constructor(
       public httpEmployee: EmployeesService,
       public router: Router
  )
   { }

  ngOnInit(): void {
      this.getOne()
      this.currentEmployee = localStorage.getItem('currentEmployee')
      this.currentEmployee = JSON.parse(this.currentEmployee)

  }
  //-----------------------------------------------------------------------------------------------
  async getOne(){
     const filter = { idEmployee: localStorage.getItem('currentIdEmployee') }
     await this.httpEmployee.getOne(filter).toPromise().then((data: any) => {
         this.currentEmployee = data.employee
         localStorage.setItem('currentEmployee', JSON.stringify(data.employee))
         console.log('CurrentEmloyee.......',this.currentEmployee );
    },(err: any) => {
    if (!this.currentEmployee) {console.log('No ha iniciado sesión');}
        this.router.navigate(['/signin'])
    })
    //-----------------------------------------------------------------------------------------------
}
}
