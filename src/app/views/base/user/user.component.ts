import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../../services/callapi.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[CallapiService,AuthenticationService,TokenService]
})
export class UserComponent {
  isLoading: boolean;
  ackHead: string;
  resColor: string;
  ackMsg: any;
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  UserMapping: any=[];
  constructor(private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token=='' || token==null || Number(localStorage.getItem('role'))===1){
      this.authenticationService.logout();
    }else{
      this.user_tools();
    }
  }
  user_tools(){
    this.isLoading = true;
    this.callapiService.user_tools().subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.UserMapping=result.UserMapping;
        }
      }
    }, error => {
      this.isLoading = false;
      this.ackHead = 'error';
      this.ackMsg = 'Something went wrong. Please try Again!';
      this.Ack.show();
    });
  }
  close_m(){
    this.Ack.hide();
  }

}
