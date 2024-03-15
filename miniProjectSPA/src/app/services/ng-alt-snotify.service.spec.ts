import { TestBed } from '@angular/core/testing';

import { NgAltSnotifyService } from './ng-alt-snotify.service';

describe('NgAltSnotifyService', () => {
  let service: NgAltSnotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAltSnotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
