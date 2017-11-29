import { TestBed, inject } from '@angular/core/testing';
import { BreadcrumbService } from './breadcrumb.service';
import {TestModule} from "../../test/test.module";

describe('BreadcrumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
      providers: [],
    });
  });

  it('should be created', inject([BreadcrumbService], (service: BreadcrumbService) => {
    expect(service).toBeTruthy();
  }));
});
