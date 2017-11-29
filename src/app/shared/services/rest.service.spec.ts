import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import {TestModule} from "../../test/test.module";

describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
      providers: [],
    });
  });

  it('should be created', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
