import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DatePipe } from '@angular/common'


// primeNg
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';



// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { TestComponent } from './components/test/test.component';
import { UpdateStatusEmployersComponent } from './components/employers/update-status-employers/update-status-employers.component';
import { PaymentsEmployersComponent } from './components/employers/payments-employers/payments-employers.component';
import { EmployeesEmployersComponent } from './components/employers/employees-employers/employees-employers.component';
import { FooterComponent } from './components/footer/footer.component';
import { GetEmployerComponent } from './components/employers/get-employer/get-employer.component';
import { DetailsEmployerComponent } from './components/employers/details-employer/details-employer.component';
import { BeneficiariesEmployersComponent } from './components/employers/beneficiaries-employers/beneficiaries-employers.component';
import { PayrollEmployerComponent } from './components/employers/payroll-employer/payroll-employer.component';
import { BeneficiariesEmployeeComponent } from './components/employees/beneficiaries-employee/beneficiaries-employee.component';
import { PayrollHistoryEmployeeComponent } from './components/employees/payroll-history-employee/payroll-history-employee.component';
import { PayrollHistoryUpEmployeeComponent } from './components/employees/payroll-history-up-employee/payroll-history-up-employee.component';
import { MonetarySubsidyEmployeeComponent } from './components/employees/monetary-subsidy-employee/monetary-subsidy-employee.component';
import { SliderModule } from 'primeng/slider';
import { MonetarySubsidyBeneficiarieComponent } from './components/beneficiaries/monetary-subsidy-beneficiarie/monetary-subsidy-beneficiarie.component';
import { GridBeneficiariesComponent } from './components/beneficiaries/grid-beneficiaries/grid-beneficiaries.component';
import { TabPageBeneficiariesComponent } from './components/beneficiaries/tab-page-beneficiaries/tab-page-beneficiaries.component';
import { GridEmployeesComponent } from './components/employees/grid-employees/grid-employees.component';
import { TabPageEmployeesComponent } from './components/employees/tab-page-employees/tab-page-employees.component';
import { DetailsEmployeesComponent } from './components/employees/details-employees/details-employees.component';
import { TabPageEmployersComponent } from './components/employers/tab-page-employers/tab-page-employers.component';
import { GridEmployersComponent } from './components/employers/grid-employers/grid-employers.component';
import { DetailsBeneficiarieComponent } from './components/beneficiaries/details-beneficiarie/details-beneficiarie.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordModule } from 'primeng/password';
import { VerifyTokenFromEmailComponent } from './components/auth/verify-token-from-email/verify-token-from-email.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SetNewPasswordComponent } from './components/auth/set-new-password/set-new-password.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { PayrollReportComponent } from './components/employers/payroll-report/payroll-report.component';
import { CheckStatusComponent } from './components/check-status/check-status.component';
import { IndividualRecordsComponent } from './components/individual-records/individual-records.component';
import { GetEmployeeComponent } from './components/employees/get-employee/get-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    UpdateStatusComponent,
    TestComponent,
    UpdateStatusEmployersComponent,
    PaymentsEmployersComponent,
    EmployeesEmployersComponent,
    FooterComponent,
    GetEmployerComponent,
    DetailsEmployerComponent,
    BeneficiariesEmployersComponent,
    PayrollEmployerComponent,
    BeneficiariesEmployeeComponent,
    PayrollHistoryEmployeeComponent,
    PayrollHistoryUpEmployeeComponent,
    MonetarySubsidyEmployeeComponent,
    MonetarySubsidyBeneficiarieComponent,
    GridBeneficiariesComponent,
    TabPageBeneficiariesComponent,
    GridEmployeesComponent,
    TabPageEmployeesComponent,
    DetailsEmployeesComponent,
    TabPageEmployersComponent,
    GridEmployersComponent,
    DetailsBeneficiarieComponent,
    RegisterComponent,
    LoginComponent,
    VerifyTokenFromEmailComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    ChangePasswordComponent,
    PayrollReportComponent,
    CheckStatusComponent,
    IndividualRecordsComponent,
    GetEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    InputTextareaModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    DynamicDialogModule,
    SliderModule,
    ListboxModule,
    PanelModule,
    SelectButtonModule,
    RadioButtonModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    MenuModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
