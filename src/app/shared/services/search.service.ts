import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";

@Injectable()
export class SearchService {

  constructor(private restService: RestService) { }

  search(data, offset){
    return this.restService.post('search/' + (offset ? offset : 0), data);

    // return this.restService.post('search/' + offset, {
    //   phrase: phrase,
    //   options: Object.assign({target: target}, options),
    // });
  }
}
