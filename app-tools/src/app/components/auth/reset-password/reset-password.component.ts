 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms'
 import { Router, CanActivate } from '@angular/router';
 import { PrimeNGConfig } from 'primeng/api';
 import { Message, MessageService} from 'primeng/api';

 import { AuthService } from 'src/app/services/auth.service'

 @Component({
     selector: 'app-reset-password',
     templateUrl: './reset-password.component.html',
     styleUrls: ['./reset-password.component.css'],
     providers: [MessageService]
 })
 export class ResetPasswordComponent implements OnInit {
     resetPassForm: FormGroup
     statusForm: boolean = false
     displayDialog: boolean = false
     msgInfo: string = ''


     constructor(
         public messageService: MessageService,
         private primengConfig: PrimeNGConfig,
         public authService: AuthService,
         public router: Router,
         public fb: FormBuilder
     )
     {
         this.resetPassForm = this.fb.group({
             id_number: [null, [Validators.required]],
             name: [ null, Validators.compose([Validators.minLength(8), Validators.required])],
             email: [null, Validators.compose([Validators.email, Validators.required])],
         })
     }

     ngOnInit(): void {
     }
     getDataForUser () {
         const id_number = { id_number: this.resetPassForm.value.id_number}
         this.authService.getDataForUser(id_number).subscribe((data: any) => {
             if (data.userFound){
                 this.resetPassForm.controls.name.setValue(data.user.name)
                 this.resetPassForm.controls.email.setValue(data.user.email)

             }
         })
     }
     sendUser () {
         this.statusForm = this.resetPassForm.invalid
         if (this.resetPassForm.valid) {
             let user = {
                 id_number: this.resetPassForm.value.id_number,
                 name: this.resetPassForm.value.name,
                 email: this.resetPassForm.value.email
             }
             this.authService.resetPassword(user).subscribe((data: any) => {
                 console.log('Respuesta de resetPassword',data)
             })
          this.msgInfo = `${user.name}, La solicitud de recordar contraseña, ha sido realizada.
                          Se envió un link de confirmación a su de correo electrónico ${user.email}.
                          Por favor confirme su solicitud. Dispone de dos horas para la confirmción.`
          this.displayDialog = true
      }
      else {
          console.log("Hay datos inválidos en el formulario")
      }
     }
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     closeDialog(){
      this.displayDialog=false
      this.router.navigate(['/signin'])
  }

}
