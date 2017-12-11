import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[memberActive]'
})
export class ActiveDirective {

  @HostBinding('style.color')
  get setColor() {
    return this.color;
  };

  @Input('memberActive') color = 'green';

  constructor() {
  }

}
