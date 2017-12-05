import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {expertiseRouting} from './expertise.routing';
import {SharedModule} from '../../shared/shared.module';
import {ExpertiseComponent} from './expertise.component';
import {ExpertiseFormComponent} from './expertise-form/expertise-form.component';

@NgModule({
  imports: [
    expertiseRouting,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ExpertiseComponent,
    ExpertiseFormComponent,
  ],
})
export class ExpertiseModule{

}
