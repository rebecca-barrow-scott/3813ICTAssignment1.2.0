import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChannelService]
    })

    service = TestBed.get(ChannelService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
