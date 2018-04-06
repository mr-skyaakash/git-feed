import { TestBed, inject } from '@angular/core/testing';

import { FetchFeedService } from './fetch-feed.service';

describe('FetchFeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchFeedService]
    });
  });

  it('should be created', inject([FetchFeedService], (service: FetchFeedService) => {
    expect(service).toBeTruthy();
  }));
});
