import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatOptionModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import { TagComponent } from './tag.component';
import {TagRouting} from './tag.routing';

@NgModule({
  imports: [
    CommonModule,
    TagRouting,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  declarations: [TagComponent],
})
export class TagModule { }
