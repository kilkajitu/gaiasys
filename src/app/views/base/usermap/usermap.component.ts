import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../../services/callapi.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-usermap',
  templateUrl: './usermap.component.html',
  styleUrls: ['./usermap.component.scss']
})
export class UsermapComponent {
  isLoading: boolean;
  ackHead: string;
  resColor: string;
  ackMsg: any;
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('Tools', {static: false}) Tools: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  name: string='';
  id: number=0;
  flag_call: number=0;
  ToolGroups: any;
  UserMapObj: any=[];
  purchasedate: string;
  costprice: number;
  toolgroup_id: number;
  user_id: any;
  Users: any;
  constructor(private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }
    
  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token=='' || token==null || Number(localStorage.getItem('role'))===0){
      this.authenticationService.logout();
    }else{
      this.toolgroups();
      this.usermap();
    }
  }
  toolgroups(){
    this.isLoading = true;
    this.callapiService.ToolGroupUser().subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolGroups=result.ToolGroups;
          this.Users=result.Users;
        }
      }
    }, error => {
      this.isLoading = false;
      this.ackHead = 'error';
      this.ackMsg = 'Something went wrong. Please try Again!';
      this.Ack.show();
    });
  }
  usermap(){
    this.isLoading = true;
    this.callapiService.UserMap(this.flag_call,this.id,this.user_id,this.toolgroup_id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.UserMapObj=result.UserMapping;
          if(this.flag_call!=0){
            this.ackHead = 'Success';
            this.resColor='text-success';
            this.ackMsg = 'Mapped Successfully';
            this.Ack.show();
          }
        }else{
          this.ackHead = 'Failed';
          this.resColor='text-danger';
          this.ackMsg = result.msg;
          this.Ack.show();
        }
      }
    }, error => {
      this.isLoading = false;
      this.Tools.hide();
      this.ackHead = 'error';
      this.ackMsg = 'Something went wrong. Please try Again!';
      this.Ack.show();
    });
  }
  showModal(){
    this.user_id=null;
    this.toolgroup_id=null;
    this.flag_call=1;
    this.id=0;
    this.Tools.show();
  }
  close_m(){
    this.Ack.hide();
  }
  delete_Map(id){
    this.isLoading = true;
    this.callapiService.UserMap(3,id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.UserMapObj=result.UserMapping;
          this.ackHead = 'Success';
          this.resColor='text-success';
          this.ackMsg = 'Deleted Successfully';
          this.Ack.show();
        }else{
          this.ackHead = 'Failed';
          this.resColor='text-danger';
          this.ackMsg = result.msg;
          this.Ack.show();
        }
      }
    }, error => {
      this.isLoading = false;
      this.Tools.hide();
      this.ackHead = 'error';
      this.ackMsg = 'Something went wrong. Please try Again!';
      this.Ack.show();
    });
  }

}
