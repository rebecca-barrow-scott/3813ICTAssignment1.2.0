import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService]
    })

    service = TestBed.get(GroupService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set group collection', () => {
    it('should set group collction', () => {
      const groupResponse = {"feedback": null}
      let response;
      spyOn(service, 'setGroupCollection').and.returnValue(of(groupResponse));
      service.setGroupCollection().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });

  describe('set group assist collection', () => {
    it('should set group assist collction', () => {
      const groupResponse = {"feedback": null}
      let response;
      spyOn(service, 'setGroupAssistCollection').and.returnValue(of(groupResponse));
      service.setGroupAssistCollection().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });
  describe('create group', () => {
    it('should create a group', () => {
      const groupResponse = {"feedback": null, "group": {id: 10, name: 'test group'}}
      let response;
      spyOn(service, 'createGroup').and.returnValue(of(groupResponse));
      service.createGroup({id: 10, name: 'test group'}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });

  describe('validate a group', () => {
    it('should validate a group', () => {
      const groupResponse = {"feedback": null}
      let response;
      spyOn(service, 'validateGroup').and.returnValue(of(groupResponse));
      service.validateGroup({name: 'test group 2'}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });

  describe('get a specific group', () => {
    it('should get a specific group', () => {
      const groupResponse = {"id":1,"name":"Group 1"}
      let response;
      spyOn(service, 'getGroup').and.returnValue(of(groupResponse));
      service.getGroup({id: 1}).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(groupResponse);
    });
  });
});