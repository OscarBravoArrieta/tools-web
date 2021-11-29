 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms'
 import { Router, CanActivate } from '@angular/router';

 import { AuthService } from 'src/app/services/auth.service'
 import { MessageService} from 'primeng/api';

 @Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.css'],
     providers: [MessageService]
 })
 export class LoginComponent implements OnInit {
     loginForm: FormGroup
     statusForm: boolean = false
     //--------------------------------------------------------------------------------------------
     constructor(public messageService: MessageService,
                 public authService: AuthService,
                 public router: Router,
                 public fb: FormBuilder) {
                  this.loginForm = this.fb.group({
                       idEmployee: [null, [Validators.required]],
                       password: [ null, Validators.compose([Validators.minLength(6), Validators.required])],
                  })
     }
     //--------------------------------------------------------------------------------------------
     ngOnInit(): void {
     }
     //--------------------------------------------------------------------------------------------
     sendUser () {
      this.statusForm = this.loginForm.invalid
      if (this.loginForm.valid) {
          let loginUser = {
               id_number: this.loginForm.value.idEmployee,
               password: this.loginForm.value.password,
          }
          this.authService.signIn(loginUser).subscribe((data:any)=>{
               console.log('respuesta de login', data)
          })
      }
      else {
           console.log("Hay datos inválidos en el formulario")
      }
     }
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------

}
