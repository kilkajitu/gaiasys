// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BaseRoutingModule } from './base-routing.module';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalModule } from "ngx-bootstrap";
import { ToolgroupsComponent } from './toolgroups/toolgroups.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ToolsComponent } from './tools/tools.component';
import { UsermapComponent } from './usermap/usermap.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    ToolgroupsComponent,
    ToolsComponent,
    UsermapComponent
  ]
})
export class BaseModule { }
