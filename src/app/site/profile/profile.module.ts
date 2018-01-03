import { NgModule } from '@angular/core';
import {loginRouting} from './profile.routing';
import {ProfileComponent} from './profile.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    loginRouting,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    ImageUploadModule.forRoot(),
  ],
  exports: []
})
export class ProfileModule {}
