 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Params  } from '@angular/router';
 import { AuthService } from 'src/app/services/auth.service';
 import { Message, MessageService} from 'primeng/api';

 import { FormBuilder, FormGroup, Validators } from '@angular/forms'
 import { Router, CanActivate } from '@angular/router';
 import { PrimeNGConfig } from 'primeng/api';

 @Component({
     selector: 'app-change-password',
     templateUrl: './change-password.component.html',
     styleUrls: ['./change-password.component.css'],
     providers: [MessageService]
 })
 export class ChangePasswordComponent implements OnInit {
     changePasswordForm: FormGroup
     statusForm: boolean = false
     token: string = ''
     currentId: number = 0
     accountConfirmed: boolean = false
     msgsSucces: Message[]=[];
     msgsError: Message[]=[];
     displayDialog: boolean = false
     msgInfo: string = ''

     constructor(
         public authService: AuthService,
         private activatedRoute: ActivatedRoute,
         private primengConfig: PrimeNGConfig,
         public router: Router,
         public fb: FormBuilder

     ) {
         this.token = this.activatedRoute.snapshot.params.token
         this.changePasswordForm = this.fb.group({
             password:
                 [
                     null,
                     Validators.compose([Validators.minLength(8),
                     Validators.required,
                     Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')])
                 ],
             passwordConfirm:
                 [
                     null,
                     Validators.compose([Validators.minLength(8),
                     Validators.required])]
         },
         {
             validator: this.checkPasswords
         })
     }
     //--------------------------------------------------------------------------------------------
     checkPasswords(group: FormGroup) { // here we have the 'passwords' group
         let pass = group.controls.password.value;
         let confirmPass = group.controls.passwordConfirm.value;
         if (pass === confirmPass) {
             return null
         }else {
             group.controls.passwordConfirm.setErrors({ NoPassswordMatch: true });
             return { notSame: true }
         }
     }

     ngOnInit(): void {
         this.currentId = Number(localStorage.getItem('toolsCurrentUser'))
     }
     //--------------------------------------------------------------------------------------------
     sendUser () {
         this.statusForm = this.changePasswordForm.invalid
         if (this.changePasswordForm.valid) {
             let newPassword = {
                 password: this.changePasswordForm.value.password,
             }
             this.authService.updatePassword(this.currentId, newPassword).subscribe((data: any) => {
                 console.log('Respuesta de set-new-pasword',data)
             })
             this.msgInfo = `Su contraseña ha sido cambiada`
             this.displayDialog = true
         } else {
             console.log("Hay datos inválidos en el formulario")
         }
     }
     //--------------------------------------------------------------------------------------------
     closeDialog(){
         this.displayDialog=false
         this.router.navigate(['/signin'])
     }
  //--------------------------------------------------------------------------------------------

 }
