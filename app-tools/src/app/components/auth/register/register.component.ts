 import { Component, OnInit } from '@angular/core'
 import { FormBuilder, FormGroup, Validators } from '@angular/forms'
 import { Router, CanActivate } from '@angular/router';
 import { PrimeNGConfig } from 'primeng/api';


 import { AuthService } from 'src/app/services/auth.service'
 import { Message, MessageService} from 'primeng/api';

 @Component({
     selector: 'app-register',
     templateUrl: './register.component.html',
     styleUrls: ['./register.component.css'],
     providers: [MessageService]
 })

 export class RegisterComponent implements OnInit {

     registerForm: FormGroup
     statusForm: boolean = false
     nameUser: string = ''
     displayDialog: boolean = false
     msgInfo: string = ''

     constructor(public messageService: MessageService,
                 public authService: AuthService,
                 private primengConfig: PrimeNGConfig,
                 public router: Router,
                 public fb: FormBuilder) {
                     this.registerForm = this.fb.group({
                         id_number: [null, [Validators.required]],
                         name: [null, [Validators.required]],
                         email: [null, Validators.compose([Validators.email, Validators.required])],
                         password:
                             [
                                 null,
                                 Validators.compose([Validators.minLength(6),
                                 Validators.required] )
                             ],
                         passwordConfirm:
                            [
                                 null,
                                 Validators.compose([Validators.minLength(6),
                                 Validators.required])]
                     },
                     {
                         validator: this.checkPasswords
                     })
     }
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

     //---------------------------------------------------------------------------------------------
     ngOnInit(): void {
         this.statusForm = !this.registerForm.invalid
         this.primengConfig.ripple = true

     }
     //---------------------------------------------------------------------------------------------
     sendUser () {
         this.statusForm = this.registerForm.invalid
         if (this.registerForm.valid) {
             let newUser = {
                 id_number: this.registerForm.value.id_number,
                 name: this.registerForm.value.name,
                 email: this.registerForm.value.email,
                 password: this.registerForm.value.password,
                 status: false,
                 creation_date: new Date(),
                 token: 'myToken',
                 reset_date_password: new Date(),
                 createdAt: new Date(),
                 updatedAt: new Date()
             }

             this.authService.signUp(newUser).subscribe((data: any) => {
                 console.log('Respuesta de sigup',data)

             })
             this.msgInfo = `Usuario ${newUser.name} ha sido creado satisfactoriamente.
                             Se envió un link de confirmación a su de correo electrónico ${newUser.email}.
                             Por favor confirme su cuenta.`
             this.displayDialog = true

            //  setTimeout(()=>{
            //      this.router.navigate(['/signup'])
            //  }, 3000);

         }
         else {
             console.log("Hay datos inválidos en el formulario")
         }
     }
     //---------------------------------------------------------------------------------------------
     getDataForUser () {
         const id_number = { id_number: this.registerForm.value.id_number}
         this.authService.getDataForUser(id_number).subscribe((data: any) => {
              console.log('Datos del usuario a crear...', data)
              if (!this.registerForm.value.id_number){
                   this.customToast('error', 'Error', 'Escriba el número de identificación')
                   return
              }
              if (data.userFound){
                  this.customToast('error', 'Error', data.message)
                     //this.registerForm.controls.id_number.setValue('')
                     this.registerForm.controls.name.setValue('')
                     this.registerForm.controls.email.setValue('')

                  return
              }

             if(data.length == 0){
                 this.customToast('error', 'Error', 'No se encontraron coincidencias con ' + this.registerForm.value.id_number)
                 //this.registerForm.controls.id_number.setValue('')
                 this.registerForm.controls.name.setValue('')
                 this.registerForm.controls.email.setValue('')
                 return
             }
             if (data.length > 0) {
                 if(data[0].ESTADO != 'A'){
                     this.customToast('error', 'Error', data[0].NOMBRE + ', Está inactivo')
                     //this.registerForm.controls.id_number.setValue('')
                     this.registerForm.controls.name.setValue('')
                     this.registerForm.controls.email.setValue('')
                     return
                 }
                 this.registerForm.controls.name.setValue(data[0].NOMBRE)
                 this.registerForm.controls.email.setValue(data[0].EMAIL)
             }
      })
     }
     //---------------------------------------------------------------------------------------------
     customToast(severity: string, summary: string, detail: string) {
         this.messageService.add({severity: severity, summary: summary, detail: detail});
     }
     //---------------------------------------------------------------------------------------------
     closeDialog(){
         this.displayDialog=false
         this.router.navigate(['/signin'])
     }

  }
