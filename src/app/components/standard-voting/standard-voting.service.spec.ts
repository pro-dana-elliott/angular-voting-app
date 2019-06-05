import { TestBed } from '@angular/core/testing';

import { StandardVotingService } from './standard-voting.service';

describe('StandardVotingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardVotingService = TestBed.get(StandardVotingService);
    expect(service).toBeTruthy();
  });
});
