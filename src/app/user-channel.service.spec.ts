import { TestBed } from '@angular/core/testing';

import { UserChannelService } from './user-channel.service';

describe('UserChannelService', () => {
  let service: UserChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
