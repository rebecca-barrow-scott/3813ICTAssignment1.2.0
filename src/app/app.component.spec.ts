import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AddUserComponent } from './add-user/add-user.component';

describe('AppComponent', () => {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        UserComponent,
        AllUserComponent,
        LoginComponent,
        CreateUserComponent,
        ChangeRoleComponent,
        ChannelComponent,
        GroupComponent,
        CreateGroupComponent,
        AddUserComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chattyapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chattyapp');
  });
});
