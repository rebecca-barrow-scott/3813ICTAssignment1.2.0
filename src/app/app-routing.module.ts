import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'allUser', component: AllUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
