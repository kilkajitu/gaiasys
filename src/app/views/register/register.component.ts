import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../services/callapi.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {Router} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  providers:[CallapiService,AuthenticationService]
})
export class RegisterComponent {
  name:any;
  username:any;
  passwordf:any;
  passwordc:any;
  pass_flag:boolean=true;
  pass_match_flag:boolean=true;
  isLoading: boolean;
  ackHead: any;
  ackMsg: any;
  ack: any;
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  resColor: string;
  flag_redirect: boolean=false;
  constructor(private router: Router,private callapiService: CallapiService, public authenticationService: AuthenticationService) { }
  register(){
    this.pass_flag=true;
    this.pass_match_flag=true;
    if(this.passwordf===this.passwordc){
      if(this.passwordf.length>=8){
        this.signup();
      }else{
        this.pass_flag=false;
      }
    }else{
      this.pass_match_flag=false;
    }
  }
  signup(){
    this.isLoading = true;
    this.callapiService.register(this.name,this.username,this.passwordf).subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ackHead='Success';
          this.resColor='text-success';
          this.ackMsg=result.msg;
          this.Ack.show();
          this.flag_redirect=true;
        }else{
          this.ackHead='Failed';
          this.resColor='text-danger';
          this.ackMsg=result.msg;
          this.Ack.show();
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
    if(this.flag_redirect){
      this.router.navigate(['../login']);
    }
  }
}
