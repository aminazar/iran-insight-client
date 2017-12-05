import { Injectable } from '@angular/core';

import {ReplaySubject} from "rxjs/ReplaySubject";
import {ProgressModeEnum} from "../enum/progressMode.enum";

@Injectable()
export class ProgressService {
  progressModeEnum = ProgressModeEnum;
  showProgress: ReplaySubject<boolean> = new ReplaySubject(1);
  progressMode: ReplaySubject<any> = new ReplaySubject(1);
  progressValue: ReplaySubject<number> = new ReplaySubject(1);
  progressBufferValue: ReplaySubject<number> = new ReplaySubject(1);

  constructor() {
    this.showProgress.next(false);

    //Set default values
    this.progressMode.next(this.progressModeEnum.indeterminate);
    this.progressValue.next(null);
    this.progressBufferValue.next(null);
  }

  enable(){
    this.showProgress.next(true);
  }

  disable(){
    this.showProgress.next(false);
  }
}
