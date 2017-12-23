import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {ProgressService} from './progress.service';

@Injectable()
export class SearchService {
  limitation = 10;

  constructor(private restService: RestService, private progressService: ProgressService) { }

  search(data, offset, pageSize = this.limitation){

    return this.restService.post('search/' + (offset ? offset : 0) + '/' + (pageSize ? pageSize : this.limitation), data);

    // return this.restService.post('search/' + offset, {
    //   phrase: phrase,
    //   options: Object.assign({target: target}, options),
    // });
  }
}
