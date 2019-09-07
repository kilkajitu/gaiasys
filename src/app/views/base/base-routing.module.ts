import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolgroupsComponent } from './toolgroups/toolgroups.component';
import { ToolsComponent } from './tools/tools.component';
import { UsermapComponent } from './usermap/usermap.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'toolgroups',
        component: ToolgroupsComponent,
        data: {
          title: 'ToolGroups'
        }
      },
      {
        path: 'tools',
        component: ToolsComponent,
        data: {
          title: 'Tools'
        }
      },
      {
        path: 'assign',
        component: UsermapComponent,
        data: {
          title: 'Assign User'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
