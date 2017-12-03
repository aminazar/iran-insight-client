import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {TestModule} from '../../test/test.module';
import {SiteTestRouting} from '../../site/site.routing';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TestModule,
        SiteTestRouting,
      ],
      providers: [],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
