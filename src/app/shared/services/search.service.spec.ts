import { TestBed, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
import {TestModule} from "../../test/test.module";

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestModule],
      providers: [],
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
