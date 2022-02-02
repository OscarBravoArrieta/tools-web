 import { Component, OnInit, Output, EventEmitter} from '@angular/core';
 import { EmployeesService } from 'src/app/services/employees.service';
 import { DatePipe } from '@angular/common'
 import { Router } from '@angular/router';

 @Component({
     selector: 'app-get-employee',
     templateUrl: './get-employee.component.html',
     styleUrls: ['./get-employee.component.css'],
     providers: [DatePipe]
 })
 export class GetEmployeeComponent implements OnInit {

     @Output() idEmployee = new EventEmitter<string>();
     results: any
     selectedEmployee: string = ''

     constructor(
         private employeesService: EmployeesService,
         private router: Router,
         public datepipe: DatePipe
      ) { }
     //---------------------------------------------------------------------------------------------
     ngOnInit(): void {
     }
     //---------------------------------------------------------------------------------------------
      getAll(e:any): void {
           const filter = { status: 'A', cutOffDate: this.datepipe.transform(new(Date), 'yyyy-MM-dd'), filterName: e, forSearchHelp: true}
           this.employeesService.getEmployees(filter).subscribe((data: any) => {
           this.results = data.employees
           console.log(this.results);
          })

      }
      sendSelectedEmployee(): void {
           this.idEmployee.emit(this.selectedEmployee);
      }
}
