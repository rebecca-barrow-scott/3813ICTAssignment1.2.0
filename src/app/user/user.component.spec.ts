import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockUser } from '../../mockusers';
import { UserService } from '../user.service';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ UserComponent ],
      providers: [{provide: UserService, useClass: MockUser}]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
    })
  }));
  // it('should have one user', async(()=> {
  //   expect(component.testUser.length).toEqual(1)
  // }))
});
