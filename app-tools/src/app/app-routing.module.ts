 import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';
 import { RegisterComponent } from './components/auth/register/register.component';
 import { LoginComponent } from './components/auth/login/login.component';

 import { GridEmployersComponent } from './components/employers/grid-employers/grid-employers.component';
 import { GridEmployeesComponent } from './components/employees/grid-employees/grid-employees.component';
 import { GridBeneficiariesComponent } from './components/beneficiaries/grid-beneficiaries/grid-beneficiaries.component';
 import { UpdateStatusComponent } from './components/update-status/update-status.component';

 const routes: Routes = [
     { path: 'main-employers', component: GridEmployersComponent},
     { path: 'main-employees', component: GridEmployeesComponent},
     { path: 'main-beneficiaries', component: GridBeneficiariesComponent },
     { path: 'update-status', component: UpdateStatusComponent },
     { path: 'signup', component: RegisterComponent },
     { path: 'signin', component: LoginComponent },
 ];

 @NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
 })
 export class AppRoutingModule { }
