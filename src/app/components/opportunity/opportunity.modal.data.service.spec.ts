import { TestBed } from '@angular/core/testing';

import { OpportunityModalDataService } from './opportunity.modal.service';

describe('DataService', () => {
  let service: OpportunityModalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpportunityModalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
