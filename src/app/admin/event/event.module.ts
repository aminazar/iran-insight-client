import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatIconModule,
  MatInputModule, MatNativeDateModule, MatPaginatorModule, MatRadioModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import {SharedModule} from '../../shared/shared.module';
import {EventComponent} from './event.component';
import {EventFormComponent} from './components/event-form/event-form.component';
import {eventRouting} from './event.routing';
import { EventViewComponent } from './components/event-view/event-view.component';

@NgModule({
  imports: [
    eventRouting,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtglbLDTFZFa1rE-glHm7bFxnp9iANHro'
    }),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MatRadioModule,
  ],
  declarations: [
    EventComponent,
    EventFormComponent,
    EventViewComponent,
  ]
})
export class EventModule {

}
