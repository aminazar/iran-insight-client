import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PersonComponent} from './person.component';
import {personRouting} from './person.routing';
import {PersonFormComponent} from './components/person-form/person-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    personRouting,
    SharedModule
  ],
  declarations: [PersonComponent, PersonFormComponent]
})
export class PersonModule{
}
