import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  constructor() {


  }

  isUserLoggedIn: boolean = false;

  title = 'app-tools';
  ngOnInit(): void {

  }
}
