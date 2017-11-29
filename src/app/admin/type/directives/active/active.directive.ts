import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[type_active]'
})
export class ActiveDirective {

  @HostBinding('style.color') get setColor() {
    return this.color;
  };
  @Input('type_active') color = 'green';

  constructor() {
  }

}
