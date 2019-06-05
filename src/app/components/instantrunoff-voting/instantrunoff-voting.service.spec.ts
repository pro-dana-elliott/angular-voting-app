import { TestBed } from '@angular/core/testing';

import { InstantRunoffVotingService } from './instant-runoff-voting.service';

describe('InstantRunoffVotingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstantRunoffVotingService = TestBed.get(InstantRunoffVotingService);
    expect(service).toBeTruthy();
  });
});
