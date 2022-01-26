 import { Component, OnInit } from '@angular/core';
 import { AuthService } from 'src/app/services/auth.service';
 import { Router } from '@angular/router';
 import { NavigationEnd } from '@angular/router';
 import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';

 @Component({
     selector: 'app-menu-bar',
     templateUrl: './menu-bar.component.html',
     styleUrls: ['./menu-bar.component.css'],
     providers: [MessageService]
 })
 export class MenuBarComponent implements OnInit {
     isUserLoggedIn: boolean = true;

     constructor(
         public authService: AuthService,
         public router: Router,
         private messageService: MessageService,
         private primengConfig: PrimeNGConfig)
         {}

     items: any = [];
     itemsLogout: MenuItem[]=[];
     showMenu: boolean = false;
     currentUserName: string =''
     ngOnInit(): void {
         this.primengConfig.ripple = true;
         this.showMenu = this.authService.loggIn()
         //this.currentUserName = localStorage.getItem('userName')?.toString

         this.items = [
             {
                 label: 'Afiliacion y aportes',
                 items: [
                     {
                         label: 'Población',
                         // icon: 'pi pi-fw pi-plus',
                         items: [
                             {label: 'Empleadores', routerLink: ['/main-employers']},
                             {label: 'Trabajadores', routerLink: ['/main-employees']},
                             {label: 'Personas a cargo', routerLink: ['/main-beneficiaries']},
                            //  {label: 'Registros individuales'}

                         ]
                     },
                     {label: 'Consultar estado', routerLink: ['/check-status'] },
                     {label: 'Actualizar estado', routerLink: ['/update-status'] },
                     {label: 'Reporte de nómina', routerLink: ['/payrol-report'] },
                     // {label: 'Quit'}
                 ]
             },
             {
                 // label: 'Edit',
                 // icon: 'pi pi-fw pi-pencil',
                 // items: [
                 // {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                 // {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                 // ]
             }
         ];

         //localStorage.getItem('userName')
         this.itemsLogout =
             [
                 {label: (localStorage.getItem('userName') || ''.replace('_', ' ')).toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase()) || '',
                     items:
                     [
                         {label: 'Cambiar contraseña', command:() => {this.changePassword()}},
                         {label: 'Cerrar sesión', icon: "pi pi-power-off", command:() => {this.logout()}}
                     ]
                 },
             ]
     }
     // ---------------------------------------------------------------------------------------------
     logout(){
         this.authService.logout()
     }
     // ---------------------------------------------------------------------------------------------
     changePassword() {
         //this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
         this.router.navigate(['/change-password'])
      }
     // ---------------------------------------------------------------------------------------------

}
