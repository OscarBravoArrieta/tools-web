 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Params  } from '@angular/router';
 import { AuthService } from 'src/app/services/auth.service';
 import { Message, MessageService} from 'primeng/api';

 @Component({
     selector: 'app-verify-token-from-email',
     templateUrl: './verify-token-from-email.component.html',
     styleUrls: ['./verify-token-from-email.component.css'],
     providers: [MessageService]
 })
 export class VerifyTokenFromEmailComponent implements OnInit {
     token: string = ''
     accountConfirmed: boolean = false
     msgsSucces: Message[]=[];
     msgsError: Message[]=[];

     constructor(
         public authService: AuthService,
         private activatedRoute: ActivatedRoute) {
         this.token = this.activatedRoute.snapshot.params.token
     }
     ngOnInit(): void {

         this.msgsSucces = [
             {severity:'success', summary:'Success', detail:'Cuenta confirmada satisfactoramente.'},
         ];
         this.msgsError = [
             {severity:'error', summary:'Error', detail:'Error al confirmar la cuenta.'}
         ];

         this.authService.verifyTokenFromEmail(this.token).subscribe((data:any) =>{
             this.accountConfirmed = data.accountConfirmed
             console.log('Confirmar cuenta', data.currentId)
         })
     }

}
