import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css'],
  providers: [MessageService]
})
export class SetNewPasswordComponent implements OnInit {
     token: string = ''
     accountConfirmed: boolean = false
     msgsSucces: Message[]=[];
     msgsError: Message[]=[];

  constructor(
       public authService: AuthService,
       private activatedRoute: ActivatedRoute)
       {
           this.token = this.activatedRoute.snapshot.params.token

        }

  ngOnInit(): void {
    this.msgsSucces = [
      {severity:'success', summary:'Success', detail:'Cuenta confirmada satisfactoramente.'},
  ];
  this.msgsError = [
      {severity:'error', summary:'Error', detail:'Error al confirmar la cuenta.'}
  ];



     this.authService.verifyTokenToRestorePassword(this.token).subscribe((data:any) =>{
         this.accountConfirmed = data.accountConfirmed

         console.log('Confirmar cuenta', data)
     })

  }
  customAlert(severity: string, summary: string, detail: string) {

  }


}
