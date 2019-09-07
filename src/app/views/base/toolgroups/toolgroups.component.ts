import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../../services/callapi.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {TokenService} from '../../../services/token.service';
import { initOffset } from 'ngx-bootstrap/chronos/units/offset';

@Component({
  selector: 'app-toolgroups',
  templateUrl: './toolgroups.component.html',
  styleUrls: ['./toolgroups.component.scss'],
  providers:[CallapiService,AuthenticationService,TokenService]
})
export class ToolgroupsComponent {
  isLoading: boolean;
  ackHead: string;
  resColor: string;
  ackMsg: any;
  @ViewChild('ack', {static: false}) Ack: ModalDirective;
  @ViewChild('Tools', {static: false}) Tools: ModalDirective;
  @ViewChild('sessionModal', {static: false}) sessionModal: ModalDirective;
  ToolGroups: any=[];
  name: string='';
  id: number=0;
  flag_call: number=0;
  constructor(private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }
    
  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token=='' || token==null || Number(localStorage.getItem('role'))===0){
      this.authenticationService.logout();
    }else{
      this.name='';
      this.flag_call=0;
      this.id=0;
      this.create_tool();
    }
  }
  create_tool(){
    this.isLoading = true;
    this.callapiService.ToolGroup(this.flag_call,this.name,this.id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolGroups=result.ToolGroups;
          if(this.flag_call!==0){
            this.ackHead = 'Success';
            this.resColor='text-success';
            if(this.id==0){
              this.ackMsg = '"'+this.name+'" Created Successfully';
            }else{
              this.ackMsg = '"'+this.name+'" Updated Successfully';
            }
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
    this.name='';
    this.flag_call=1;
    this.id=0;
    this.Tools.show();
  }
  close_m(){
    this.Ack.hide();
  }
  edit_toolgroup(id,name){
    this.id=id;
    this.name=name;
    this.flag_call=2;
    this.Tools.show();
  }
  delete_toolgroup(id){
    this.isLoading = true;
    this.callapiService.ToolGroup(3,'',id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolGroups=result.ToolGroups;
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
