import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangeRoleComponent } from './change-role/change-role.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'allUser', component: AllUserComponent},
  {path: '', component: LoginComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'changeRole/:id', component: ChangeRoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
