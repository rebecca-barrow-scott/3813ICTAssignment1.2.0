import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'allUser', component: AllUserComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
