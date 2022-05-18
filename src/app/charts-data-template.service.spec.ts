import { TestBed } from '@angular/core/testing';

import { ChartsDataTemplateService } from './charts-data-template.service';

describe('ChartsDataTemplateService', () => {
  let service: ChartsDataTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsDataTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
