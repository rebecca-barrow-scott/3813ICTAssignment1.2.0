import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent} from './create-group/create-group.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'allUser', component: AllUserComponent},
  {path: '', component: LoginComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'changeRole/:id', component: ChangeRoleComponent},
  {path: 'channel/:id', component: ChannelComponent},
  {path: 'group/:id', component: GroupComponent},
  {path: 'createGroup', component: CreateGroupComponent},
  {path: 'addUser/:id', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
