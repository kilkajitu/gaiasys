import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../services/callapi.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {Router} from "@angular/router";
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers:[CallapiService,AuthenticationService,TokenService]
})
export class LoginComponent { 
  username:any;
  password:any;
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  flag_redirect: boolean=true;
  isLoading: boolean;
  ackHead: string;
  resColor: string;
  ackMsg: any;
  constructor(private router: Router,private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }
  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token!='' && token!=null){
      if(Number(localStorage.getItem('role'))==1){
        this.router.navigate(['home/toolgroups']);
      }else{
        this.router.navigate(['home/user']);
      }
    }
  }
  login(){
    this.isLoading = true;
    this.flag_redirect=true;
    this.callapiService.login(this.username,this.password).subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.tokenService.setUpOnLogin(result);
          if(Number(localStorage.getItem('role'))==1){
            this.router.navigate(['home/toolgroups']);
          }else{
            this.router.navigate(['home/user']);
          }
        }else{
          this.flag_redirect=false;
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
