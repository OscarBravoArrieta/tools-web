import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {


  constructor() { }
  //items: menuItem[];
  items: any = [];
  ngOnInit(): void {

     this.items = [
      {
          label: 'Afiliacion y aportes',
          items: [{
                  label: 'Población',
                  // icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Empleadores', routerLink: ['/main-employers']},
                      {label: 'Trabajadores', routerLink: ['/main-employees']},
                      {label: 'Personas a cargo', routerLink: ['/main-beneficiaries']},
                  ]
              },
              {label: 'Actualizar estado', routerLink: ['/update-status'] },
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
     ];


  }

}
