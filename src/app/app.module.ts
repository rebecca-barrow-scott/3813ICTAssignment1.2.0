import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AllUserComponent } from './all-user/all-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangeRoleComponent } from './change-role/change-role.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AllUserComponent,
    CreateUserComponent,
    ChangeRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
