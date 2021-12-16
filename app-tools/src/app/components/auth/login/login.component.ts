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
                       id_number: [null, [Validators.required]],
                       password: [ null, Validators.compose([Validators.minLength(8), Validators.required])],
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
               id_number: this.loginForm.value.id_number,
               password: this.loginForm.value.password,
          }
          this.authService.signIn(loginUser).subscribe((res:any)=>{
               console.log('respuesta de login', res)
               if (res.token == null){
                   this.customToast('error', 'Error', res.message)
               } else {

                   localStorage.setItem('toolsToken', res.token);
                   localStorage.setItem('toolsCurrentUser', res.data.id);
                   this.router.navigate(['/'])

                   //window.location.reload();
               }

          })

      }
      else {
           console.log("There is invalid data in loginForm")
      }
     }
     //--------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------
     //--------------------------------------------------------------------------------------------

}
