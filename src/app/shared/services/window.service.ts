import { Injectable } from '@angular/core';

function _window(){
  return window;
}

@Injectable()
export class WindowService {

  constructor() { }

  getWindow(){
    return _window();
  }
}
