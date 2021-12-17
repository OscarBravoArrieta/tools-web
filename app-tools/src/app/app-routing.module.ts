 import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';
 import { RegisterComponent } from './components/auth/register/register.component';
 import { LoginComponent } from './components/auth/login/login.component';
 import { VerifyTokenFromEmailComponent } from './components/auth/verify-token-from-email/verify-token-from-email.component';
 import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
 import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
 import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
 import { GridEmployersComponent } from './components/employers/grid-employers/grid-employers.component';
 import { GridEmployeesComponent } from './components/employees/grid-employees/grid-employees.component';
 import { GridBeneficiariesComponent } from './components/beneficiaries/grid-beneficiaries/grid-beneficiaries.component';
 import { UpdateStatusComponent } from './components/update-status/update-status.component';
 import { AppComponent } from './app.component';

 const routes: Routes = [
    //  { path: '', component: AppComponent},
     { path: 'main-employers', component: GridEmployersComponent},
     { path: 'main-employees', component: GridEmployeesComponent},
     { path: 'main-beneficiaries', component: GridBeneficiariesComponent },
     { path: 'update-status', component: UpdateStatusComponent },
     { path: 'signup', component: RegisterComponent },
     { path: 'signin', component: LoginComponent },
     { path: 'verify-token-from-email/:token', component: VerifyTokenFromEmailComponent},
     { path: 'reset-password', component: ResetPasswordComponent },
     { path: 'set-new-password/:token', component: SetNewPasswordComponent },
     { path: 'change-password', component: ChangePasswordComponent },
 ];

 @NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
 })
 export class AppRoutingModule { }
