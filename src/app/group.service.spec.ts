import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
});
