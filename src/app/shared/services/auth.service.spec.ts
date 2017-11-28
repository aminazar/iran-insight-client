import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {TestModule} from "../../test/test.module";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
      providers: [],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
