 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Params  } from '@angular/router';
 import { AuthService } from 'src/app/services/auth.service';

 @Component({
     selector: 'app-verify-token-from-email',
     templateUrl: './verify-token-from-email.component.html',
     styleUrls: ['./verify-token-from-email.component.css']
 })
 export class VerifyTokenFromEmailComponent implements OnInit {
     token: string = ''
     accountConfirmed: boolean = false

     constructor(
         public authService: AuthService,
         private activatedRoute: ActivatedRoute) {
         this.token = this.activatedRoute.snapshot.params.token

     }

     ngOnInit(): void {

         this.authService.verifyTokenFromEmail(this.token).subscribe((data:any) =>{
             this.accountConfirmed = data.accountConfirmed
             console.log('Confirmar cuenta', data)
         })
     }

}
