import { TestBed } from '@angular/core/testing';

import { RelatedTablesService } from './related-tables.service';

describe('RelatedTablesService', () => {
  let service: RelatedTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
