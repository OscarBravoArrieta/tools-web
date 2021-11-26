 import { Component, OnInit, Output, EventEmitter} from '@angular/core';
 import { EmployersService } from 'src/app/services/employers.service';
 import { DatePipe } from '@angular/common'

@Component({
     selector: 'app-get-employer',
     templateUrl: './get-employer.component.html',
     styleUrls: ['./get-employer.component.css'],
     providers: [DatePipe]
})
export class GetEmployerComponent implements OnInit {

     @Output() idEmployer = new EventEmitter<string>();
     results: any
     selectedEmployer: string = ''

     constructor(
         private httpEmployers: EmployersService,
         public datepipe: DatePipe
     ) {


     }
     // -----------------------------------------------------------------
     ngOnInit(): void {
     }
     // -----------------------------------------------------------------
     getAll(e:any): void {
      const filter = { status: 'A', cutOffDate: this.datepipe.transform(new(Date), 'yyyy-MM-dd'), filterName: e, forSearchHelp: true}
      this.httpEmployers.getEmployers(filter).subscribe((data: any) => {
         this.results = data.employers
      })

     }
     sendSelectedEmployer(): void {
         this.idEmployer.emit(this.selectedEmployer);
     }

}
