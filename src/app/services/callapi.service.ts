import { Injectable } from '@angular/core';
import {HttpClientService} from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CallapiService {
  constructor(private httpService: HttpClientService) {
  }
  register(name,username,password): Observable<any> {
    return this.httpService.loginPost<any>(environment.API_ENDPOINT + '/register', {name: name,username:username,password:password})
  }
  login(username,password): Observable<any> {
    return this.httpService.loginPost<any>(environment.API_ENDPOINT + '/login', {username:username,password:password})
  }
  user_tools(): Observable<any> {
    return this.httpService.get<any>(environment.API_ENDPOINT + '/user_tools',null);
  }
  ToolGroup(flag,name='',id=0): Observable<any> {
    if(flag==0){
      return this.httpService.get<any>(environment.API_ENDPOINT + '/ToolGroup',null);
    }else if(flag==1){
      return this.httpService.post<any>(environment.API_ENDPOINT + '/ToolGroup',{name:name});
    }else if(flag==2){
      return this.httpService.put<any>(environment.API_ENDPOINT + '/ToolGroup',{id:id,name:name});
    }else  if(flag==3){
      return this.httpService.delete<any>(environment.API_ENDPOINT + '/ToolGroup',{id:id});
    }else{
      return this.httpService.get<any>(environment.API_ENDPOINT + '/ToolGroupGet',null);
    }
  }
  Tool(flag,id=0,name='',purchasedate='',costprice=0,toolgroup_id=0): Observable<any> {
    if(flag==0){
      return this.httpService.get<any>(environment.API_ENDPOINT + '/Tools',null);
    }else if(flag==1){
      return this.httpService.post<any>(environment.API_ENDPOINT + '/Tools',{name:name,purchasedate:purchasedate,costprice:costprice,toolgroup_id:toolgroup_id});
    }else if(flag==2){
      return this.httpService.put<any>(environment.API_ENDPOINT + '/Tools',{id:id,name:name,purchasedate:purchasedate,costprice:costprice,toolgroup_id:toolgroup_id});
    }else{
      return this.httpService.delete<any>(environment.API_ENDPOINT + '/Tools',{id:id});
    }
  }
  UserMap(flag,id=0,user_id=0,toolgroup_id=0): Observable<any> {
    if(flag==0){
      return this.httpService.get<any>(environment.API_ENDPOINT + '/UserMapping',null);
    }else if(flag==1){
      return this.httpService.post<any>(environment.API_ENDPOINT + '/UserMapping',{user_id:user_id,toolgroup_id:toolgroup_id});
    }else if(flag==2){
      return this.httpService.put<any>(environment.API_ENDPOINT + '/UserMapping',{id:id,user_id:user_id,toolgroup_id:toolgroup_id});
    }else{
      return this.httpService.delete<any>(environment.API_ENDPOINT + '/UserMapping',{id:id});
    }
  }
  ToolGroupUser(): Observable<any> {
      return this.httpService.get<any>(environment.API_ENDPOINT + '/ToolGroupUser',null);
  }
  userprofile(role): Observable<any> {
    if(role==1){
      return this.httpService.get<any>(environment.API_ENDPOINT + '/adminprofile',null);
    }else{
      return this.httpService.get<any>(environment.API_ENDPOINT + '/userprofile',null);
    }
  }
}
