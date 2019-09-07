import { Component,ViewChild } from '@angular/core';
import { CallapiService } from '../../../services/callapi.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalDirective, BsModalService} from 'ngx-bootstrap';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {

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
  ToolsObj: any=[];
  purchasedate: string;
  costprice: number;
  toolgroup_id: number;
  constructor(private callapiService: CallapiService
    ,private tokenService: TokenService, public authenticationService: AuthenticationService) { }
    
  ngOnInit() {
    var token = localStorage.getItem('token');
    if(token=='' || token==null || Number(localStorage.getItem('role'))===0){
      this.authenticationService.logout();
    }else{
      this.name='';
      this.purchasedate='';
      this.costprice=null;
      this.toolgroup_id=null;
      this.flag_call=0;
      this.id=0;
      this.toolgroups();
      this.create_tool();
    }
  }
  toolgroups(){
    this.isLoading = true;
    this.callapiService.ToolGroup(4).subscribe((result: any) => {
      this.isLoading = false;
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolGroups=result.ToolGroups;
        }
      }
    }, error => {
      this.isLoading = false;
      this.ackHead = 'error';
      this.ackMsg = 'Something went wrong. Please try Again!';
      this.Ack.show();
    });
  }
  create_tool(){
    this.isLoading = true;
    this.callapiService.Tool(this.flag_call,this.id,this.name,this.purchasedate,this.costprice,this.toolgroup_id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolsObj=result.Tools;
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
    this.purchasedate='';
    this.costprice=null;
    this.toolgroup_id=null;
    this.flag_call=1;
    this.id=0;
    this.Tools.show();
  }
  close_m(){
    this.Ack.hide();
  }
  edit_Tool(id,name,purchasedate,costprice,toolgroup_id){
    this.id=id;
    this.name=name;
    this.purchasedate=purchasedate;
    this.costprice=costprice;
    this.toolgroup_id=toolgroup_id;
    this.flag_call=2;
    this.Tools.show();
  }
  delete_Tool(id){
    this.isLoading = true;
    this.callapiService.Tool(3,id).subscribe((result: any) => {
      this.isLoading = false;
      this.Tools.hide();
      if (result.status==501) {
        this.authenticationService.sessionExpired(this.sessionModal, this.ackHead, this.ackMsg);
      }else{
        if(result.status==200){
          this.ToolsObj=result.Tools;
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
