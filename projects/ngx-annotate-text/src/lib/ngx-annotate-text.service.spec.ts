import { TestBed } from '@angular/core/testing';

import { NgxAnnotateTextService } from './ngx-annotate-text.service';

describe('NgxAnnotateTextService', () => {
  let service: NgxAnnotateTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAnnotateTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
