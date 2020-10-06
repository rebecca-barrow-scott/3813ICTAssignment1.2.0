import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserChannelService } from './user-channel.service';

describe('UserChannelService', () => {
  let service: UserChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserChannelService]
    })

    service = TestBed.get(UserChannelService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
