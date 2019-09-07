import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../../services/callapi.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[CallapiService,AuthenticationService,TokenService]
})
export class ProfileComponent {
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  isLoading: boolean;
  ackHead: string;
  resColor: string;
  ackMsg: any;
  profile: any=null;
  constructor(private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }
  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token=='' || token==null){
      this.authenticationService.logout();
    }else{
      this.userprofile();
    }
  }
  userprofile(){
    this.isLoading = true;
    this.callapiService.userprofile(Number(localStorage.getItem('role'))).subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.profile=result.Profile;
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

