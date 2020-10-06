import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })

    service = TestBed.get(UserService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get all users', () => {
    it('should return a collection of users', () => {
      const userResponse = [{"username":"Super","email":"super@gmail.com","password":"super","role":"Super Admin","img":"dots2.png"},
                            {"username":"John","email":"john@gmail.com","password":"123","role":"Group Admin","img":"dots2.png"},
                            {"username":"Rachel","email":"rachel@gmail.com","password":"123","role":"Group Admin","img":"dots2.png"},
                            {"username":"Kyle","email":"kyle@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Emma","email":"emma@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Mary","email":"mary@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Rebecca","email":"rebecca@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Amanda","email":"amanda@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Travis","email":"travis@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Mike","email":"mike@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Sabrina","email":"sabrina@gmail.com","password":"123","role":"User","img":"dots2.png"},
                            {"username":"Lucy","email":"lucy@gmail.com","password":"123","role":"User","img":"dots2.png"}]
      let response;
      spyOn(service, 'getAllUsers').and.returnValue(of(userResponse));
      service.getAllUsers().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('authenticate the user', () => {
    it('should return some feedback and the user', () => {
      const userResponse = {"feedback": null, "user": {"username":"Super","email":"super@gmail.com","password":"super","role":"Super Admin","img":"dots2.png"}}
      let response;
      spyOn(service, 'authUser').and.returnValue(of(userResponse));
      service.authUser({"email":"super@gmail.com","password":"super"}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('set the user collection', () => {
    it('should return some feedback', () => {
      const userResponse = {"feedback": null}
      let response;
      spyOn(service, 'setUserCollection').and.returnValue(of(userResponse));
      service.setUserCollection().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('delete all the users', () => {
    it('should delete all the users', () => {
      const userResponse = {'feedback': null, 'deletedCount': 12}
      let response;
      spyOn(service, 'deleteAllUsers').and.returnValue(of(userResponse));
      service.deleteAllUsers().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('validate a new user', () => {
    it('should validate a new user', () => {
      const userResponse =  {"feedback":null}
      let response;
      spyOn(service, 'validateUser').and.returnValue(of(userResponse));
      service.validateUser({"username":"test","email":"test@gmail.com","password":"123","role":"User","img":"dots2.png"}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('create a new user', () => {
    it('should create a new user', () => {
      const userResponse =  {"feedback":null}
      let response;
      spyOn(service, 'createUser').and.returnValue(of(userResponse));
      service.createUser({"username":"test","email":"test@gmail.com","password":"123","role":"User","img":"dots2.png"}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('change user role', () => {
    it('should change a user\'s role', () => {
      const userResponse =  {"feedback":null}
      let response;
      spyOn(service, 'changeUserRole').and.returnValue(of(userResponse));
      service.changeUserRole({"username":"test", "role":"Group Admin"}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });
});
