import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }
  items: any
  activeIndex: number = 0;

  ngOnInit(): void {

    this.items = [
      {label: 'Detalles de afiliados', icon: 'pi pi-fw pi-home'},
      {label: 'Actualizar estado', icon: 'pi pi-fw pi-calendar'},
     ];
  }

}
